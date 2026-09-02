/**
 * Fetch all DPWH infrastructure projects for Tanay, Rizal
 * and save as static JSON for the Transparency page.
 *
 * Run: node scripts/fetch-dpwh-projects.js
 *
 * Notes:
 * - The DPWH API ignores the `per_page` query parameter and always returns
 *   20 projects per page, so the page count is derived from the actual size
 *   of the first response rather than assuming per_page=50.
 * - The API is fronted by a Cloudflare WAF that blocks Node's built-in
 *   `fetch`/undici with HTTP 403. On Windows this script falls back to
 *   `curl.exe`, which is not blocked. Set DPWH_HTTP=curl or DPWH_HTTP=fetch
 *   to force a transport.
 * - Only projects that actually belong to Tanay, Rizal are kept: the API
 *   search term "Tanay" also matches other municipalities (e.g. Barangay
 *   Tanayan in Zamboanga del Norte, Barangay Katanayanan in Cotabato, and
 *   Barangay Balatanay in Basilan). Set DPWH_FILTER=0 to disable filtering.
 */

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const BASE_URL = 'https://api.transparency.dpwh.gov.ph';
const SEARCH_TERM = 'Tanay';
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const HEADERS = {
  'User-Agent': UA,
  Origin: 'https://transparency.dpwh.gov.ph',
  Referer: 'https://transparency.dpwh.gov.ph/',
  Accept: 'application/json',
};
const MAX_ATTEMPTS = 4;
const RETRY_DELAY_MS = 3000;
const PAGE_DELAY_MS = 750;

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function looksLikeChallenge(text) {
  const head = (text || '').trimStart().slice(0, 5000);
  return (
    head.startsWith('<!DOCTYPE html') ||
    /just a moment/i.test(head) ||
    /challenge-platform|enable javascript and cookies|cFwV|cRay/i.test(head)
  );
}

function parseJson(text, ctx) {
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid JSON from ${ctx}: ${(text || '').slice(0, 240)}`);
  }
}

function fetchWithCurl(url) {
  const res = spawnSync(
    'curl.exe',
    [
      '-s',
      '-L',
      '--max-time',
      '60',
      '-A',
      UA,
      '-H',
      `Origin: ${HEADERS.Origin}`,
      '-H',
      `Referer: ${HEADERS.Referer}`,
      '-H',
      `Accept: ${HEADERS.Accept}`,
      url,
    ],
    { encoding: 'utf-8' }
  );
  if (res.status !== 0) {
    throw new Error(
      `curl exited with ${res.status}: ${(res.stderr || '').slice(0, 200)}`
    );
  }
  return res.stdout || '';
}

async function fetchWithUndici(url) {
  const res = await fetch(url, { headers: HEADERS });
  const text = await res.text();
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return text;
}

async function requestJson(url, ctx) {
  let lastErr;
  const forced = (process.env.DPWH_HTTP || '').toLowerCase();

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const useCurl =
        forced === 'curl' ||
        (forced !== 'fetch' && process.platform === 'win32');
      const text = useCurl ? fetchWithCurl(url) : await fetchWithUndici(url);
      if (looksLikeChallenge(text)) {
        throw new Error('Cloudflare challenge page returned');
      }
      return parseJson(text, ctx);
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS) {
        const wait = RETRY_DELAY_MS * attempt;
        console.warn(
          `  Warning: retry ${attempt}/${MAX_ATTEMPTS - 1} for ${ctx}: ${err.message}`
        );
        await sleep(wait);
      }
    }
  }
  throw new Error(`Failed to fetch ${ctx}: ${lastErr.message}`);
}

/**
 * A project belongs to Tanay, Rizal when:
 * - its description mentions "Tanay" as a whole word, AND
 * - either the description mentions "Rizal", or the DPWH engineering
 *   district / region recorded in `location` is in Rizal.
 *
 * The API includes "Tanay" as a plain substring, which also matches places
 * like Barangay Tanayan (Zamboanga del Norte), Barangay Katanayanan
 * (Cotabato) and Barangay Balatanay (Basilan). It also happens that some
 * genuine Tanay projects (e.g. Camp Capinpin) are recorded with
 * `location.province = "Region IV-A"`, so the description is used as an
 * authoritative cross-check instead of relying on the province field alone.
 */
function isTanayRizalProject(p) {
  const desc = (p.description || '').toUpperCase();
  const province = ((p.location && p.location.province) || '').toUpperCase();
  const region = ((p.location && p.location.region) || '').toUpperCase();
  const mentionsTanay = /\bTANAY\b/.test(desc);
  const mentionsRizal =
    /\bRIZAL\b/.test(desc) ||
    province.includes('RIZAL') ||
    region.includes('RIZAL');
  return mentionsTanay && mentionsRizal;
}

function buildSummary(projects) {
  const statuses = [
    'Completed',
    'On-Going',
    'Not Started',
    'For Procurement',
    'Terminated',
  ];
  const summary = {
    totalProjects: projects.length,
    totalBudget: projects.reduce((sum, p) => sum + (p.budget || 0), 0),
  };
  for (const status of statuses) {
    const key =
      status === 'On-Going'
        ? 'ongoing'
        : status === 'Not Started'
          ? 'notStarted'
          : status === 'For Procurement'
            ? 'forProcurement'
            : status.toLowerCase();
    summary[key] = projects.filter(p => p.status === status).length;
  }
  return summary;
}

async function main() {
  console.log(`Fetching DPWH projects for ${SEARCH_TERM}, Rizal...`);

  // First page reveals the total count and the actual page size.
  const first = await requestJson(
    `${BASE_URL}/projects?search=${encodeURIComponent(SEARCH_TERM)}&page=1`,
    'page 1'
  );
  const totalCount = first.data.pagination.totalCount;
  const pageSize = first.data.data.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  console.log(
    `Total projects: ${totalCount}, page size: ${pageSize}, pages: ${totalPages}`
  );

  let projects = Array.isArray(first.data.data) ? first.data.data : [];

  for (let page = 2; page <= totalPages; page++) {
    await sleep(PAGE_DELAY_MS);
    console.log(`Fetching page ${page}/${totalPages}...`);
    const body = await requestJson(
      `${BASE_URL}/projects?search=${encodeURIComponent(SEARCH_TERM)}&page=${page}`,
      `page ${page}`
    );
    projects = projects.concat(
      Array.isArray(body.data.data) ? body.data.data : []
    );
  }
  console.log(`Fetched ${projects.length} raw projects total.`);

  // Deduplicate by contract ID in case the API ever repeats a row.
  const seen = new Set();
  const unique = [];
  for (const p of projects) {
    if (!seen.has(p.contractId)) {
      seen.add(p.contractId);
      unique.push(p);
    }
  }
  if (unique.length !== projects.length) {
    console.warn(
      `Deduplicated ${projects.length - unique.length} duplicate rows.`
    );
  }

  // Keep only Tanay, Rizal projects (unless filtering is disabled).
  let kept = unique;
  if (process.env.DPWH_FILTER !== '0') {
    kept = unique.filter(isTanayRizalProject);
    const removed = unique.filter(p => !isTanayRizalProject(p));
    if (removed.length > 0) {
      console.warn(
        `Filtered out ${removed.length} projects that are not in Tanay, Rizal:`
      );
      for (const p of removed) {
        const prov = (p.location && p.location.province) || 'unknown';
        console.warn(
          `  - ${p.contractId} | ${prov} | ${(p.description || '').slice(0, 90)}`
        );
      }
    }
  }

  const summary = buildSummary(kept);
  const output = {
    fetchedAt: new Date().toISOString(),
    summary,
    projects: kept,
  };

  const outDir = path.resolve(process.cwd(), 'public/data');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'dpwh-tanay-projects.json');
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n', 'utf-8');

  console.log(`Saved to ${path.relative(process.cwd(), outPath)}`);
  console.log(
    `Summary: ${summary.totalProjects} projects, ₱${(summary.totalBudget / 1e6).toFixed(2)}M total budget`
  );
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
