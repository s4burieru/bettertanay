/**
 * Fetch all DPWH infrastructure projects for Tanay, Rizal
 * and save as static JSON for the Transparency page.
 *
 * Run: node scripts/fetch-dpwh-projects.js
 */

const BASE_URL = 'https://api.transparency.dpwh.gov.ph';
const HEADERS = {
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  Origin: 'https://transparency.dpwh.gov.ph',
  Referer: 'https://transparency.dpwh.gov.ph/',
  Accept: 'application/json',
};

async function fetchPage(page, perPage = 50) {
  const url = `${BASE_URL}/projects?search=Tanay&page=${page}&per_page=${perPage}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for page ${page}`);
  }
  return res.json();
}

async function main() {
  console.log('Fetching DPWH projects for Tanay, Rizal...');

  // First page to get total count
  const first = await fetchPage(1, 50);
  const totalCount = first.data.pagination.totalCount;
  const totalPages = Math.ceil(totalCount / 50);
  console.log(`Total projects: ${totalCount}, pages: ${totalPages}`);

  let allProjects = [...first.data.data];

  // Fetch remaining pages
  for (let page = 2; page <= totalPages; page++) {
    console.log(`Fetching page ${page}/${totalPages}...`);
    const data = await fetchPage(page, 50);
    allProjects = allProjects.concat(data.data.data);
  }

  console.log(`Fetched ${allProjects.length} projects total.`);

  // Build summary
  const summary = {
    totalProjects: allProjects.length,
    completed: allProjects.filter(p => p.status === 'Completed').length,
    ongoing: allProjects.filter(p => p.status === 'On-Going').length,
    notStarted: allProjects.filter(p => p.status === 'Not Started').length,
    forProcurement: allProjects.filter(p => p.status === 'For Procurement')
      .length,
    terminated: allProjects.filter(p => p.status === 'Terminated').length,
    totalBudget: allProjects.reduce((sum, p) => sum + (p.budget || 0), 0),
  };

  const output = {
    fetchedAt: new Date().toISOString(),
    summary,
    projects: allProjects,
  };

  const fs = await import('fs');
  const path = await import('path');
  const outDir = path.resolve(process.cwd(), 'public/data');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(
    path.join(outDir, 'dpwh-tanay-projects.json'),
    JSON.stringify(output, null, 2),
    'utf-8'
  );

  console.log(`Saved to public/data/dpwh-tanay-projects.json`);
  console.log(
    `Summary: ${summary.totalProjects} projects, ₱${(summary.totalBudget / 1e6).toFixed(2)}M total budget`
  );
}

main().catch(err => {
  console.error('Failed:', err);
  process.exit(1);
});
