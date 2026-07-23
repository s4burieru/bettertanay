/**
 * Sitemap Generator for BetterTanay.org
 * 
 * Generates sitemap.xml and sitemap-index.xml for all pages.
 * Run: node scripts/generate-sitemap.mjs
 * 
 * Output: public/sitemap.xml
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const SITE_URL = 'https://bettertanay.org';

// ── Static routes (non-dynamic pages) ──────────────────────────────────────
const STATIC_ROUTES = [
  { path: '/', changefreq: 'daily', priority: '1.0' },
  { path: '/services', changefreq: 'weekly', priority: '0.9' },
  { path: '/government', changefreq: 'weekly', priority: '0.9' },
  { path: '/transparency', changefreq: 'weekly', priority: '0.9' },
  { path: '/statistics', changefreq: 'monthly', priority: '0.8' },
  { path: '/tourism', changefreq: 'weekly', priority: '0.9' },
  { path: '/sitemap', changefreq: 'monthly', priority: '0.5' },
];

// ── Service categories (from content/services directory) ──────────────────
const SERVICE_CATEGORIES = [
  'agriculture-fisheries',
  'business',
  'disaster-preparedness',
  'education',
  'environment',
  'garbage-waste-disposal',
  'health-services',
  'housing-land-use',
  'infrastructure-public-works',
  'social-welfare',
];

// ── Tourism categories (from content/tourism/establishments.json) ─────────
const TOURISM_CATEGORIES = [
  'heritage',
  'nature',
  'farms',
  'stay',
  'restaurants',
  'adventure',
  'others',
];

// ── Collect all service document slugs ─────────────────────────────────────
function collectServiceSlugs() {
  const slugs = [];
  const servicesDir = path.join(__dirname, '..', 'content', 'services');

  if (!fs.existsSync(servicesDir)) return slugs;

  const categories = fs.readdirSync(servicesDir);
  for (const cat of categories) {
    const catDir = path.join(servicesDir, cat);
    if (!fs.statSync(catDir).isDirectory()) continue;

    // Add category page
    slugs.push(`/services/${cat}`);

    // Add all sub-pages (markdown files except index.yaml)
    const files = fs.readdirSync(catDir);
    for (const file of files) {
      if (file.endsWith('.md')) {
        const slug = file.replace(/\.md$/, '');
        slugs.push(`/services/${cat}/${slug}`);
      }
    }
  }
  return slugs;
}

// ── Generate sitemap XML ──────────────────────────────────────────────────
function generateSitemap() {
  const now = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n`;
  xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n\n`;

  // ── Static pages ────────────────────────────────────────────────────────
  for (const route of STATIC_ROUTES) {
    const url = `${SITE_URL}${route.path === '/' ? '' : route.path}`;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${route.path === '/' ? '' : route.path}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    // hreflang alternates
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}${route.path === '/' ? '' : route.path}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="fil" href="${SITE_URL}${route.path === '/' ? '' : route.path}?lang=fil" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${route.path === '/' ? '' : route.path}" />\n`;
    xml += `  </url>\n\n`;
  }

  // ── Service category pages ──────────────────────────────────────────────
  for (const cat of SERVICE_CATEGORIES) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/services/${cat}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/services/${cat}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="fil" href="${SITE_URL}/services/${cat}?lang=fil" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/services/${cat}" />\n`;
    xml += `  </url>\n\n`;
  }

  // ── Service document pages (individual service guides) ──────────────────
  const serviceSlugs = collectServiceSlugs();
  for (const slug of serviceSlugs) {
    if (slug === '/services/' || slug.endsWith('/index')) continue;
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}${slug}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>monthly</changefreq>\n`;
    xml += `    <priority>0.7</priority>\n`;
    xml += `  </url>\n\n`;
  }

  // ── Tourism category pages ──────────────────────────────────────────────
  for (const cat of TOURISM_CATEGORIES) {
    xml += `  <url>\n`;
    xml += `    <loc>${SITE_URL}/tourism/${cat}</loc>\n`;
    xml += `    <lastmod>${now}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="en" href="${SITE_URL}/tourism/${cat}" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="fil" href="${SITE_URL}/tourism/${cat}?lang=fil" />\n`;
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}/tourism/${cat}" />\n`;
    xml += `  </url>\n\n`;
  }

  xml += `</urlset>`;

  // ── Write to file ───────────────────────────────────────────────────────
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap generated at: ${outputPath}`);
  console.log(`   Total URLs: ${STATIC_ROUTES.length + SERVICE_CATEGORIES.length + serviceSlugs.length + TOURISM_CATEGORIES.length}`);
}

generateSitemap();