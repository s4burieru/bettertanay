@echo off
setlocal enabledelayedexpansion

echo Fetching DPWH projects for Tanay, Rizal...

set "UA=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
set "ORIGIN=https://transparency.dpwh.gov.ph"
set "REFERER=https://transparency.dpwh.gov.ph/"

mkdir public\data 2>nul

echo Fetching page 1...
curl -s -L -A "%UA%" -H "Origin: %ORIGIN%" -H "Referer: %REFERER%" -H "Accept: application/json" "https://api.transparency.dpwh.gov.ph/projects?search=Tanay&page=1&per_page=50" > public\data\dpwh-page-1.json

echo Fetching page 2...
curl -s -L -A "%UA%" -H "Origin: %ORIGIN%" -H "Referer: %REFERER%" -H "Accept: application/json" "https://api.transparency.dpwh.gov.ph/projects?search=Tanay&page=2&per_page=50" > public\data\dpwh-page-2.json

echo Fetching page 3...
curl -s -L -A "%UA%" -H "Origin: %ORIGIN%" -H "Referer: %REFERER%" -H "Accept: application/json" "https://api.transparency.dpwh.gov.ph/projects?search=Tanay&page=3&per_page=50" > public\data\dpwh-page-3.json

echo Fetching page 4...
curl -s -L -A "%UA%" -H "Origin: %ORIGIN%" -H "Referer: %REFERER%" -H "Accept: application/json" "https://api.transparency.dpwh.gov.ph/projects?search=Tanay&page=4&per_page=50" > public\data\dpwh-page-4.json

echo Merging all pages...
python -c "
import json, os

pages_dir = 'public/data'
all_projects = []
first = None

for i in range(1, 5):
    path = os.path.join(pages_dir, f'dpwh-page-{i}.json')
    if os.path.exists(path):
        with open(path, 'r') as f:
            data = json.load(f)
        if first is None:
            first = data
        all_projects.extend(data['data']['data'])
        print(f'Page {i}: {len(data[\"data\"][\"data\"])} projects')
    else:
        print(f'Page {i}: not found')

if first is None:
    print('No data fetched!')
    exit(1)

total_count = first['data']['pagination']['totalCount']
print(f'Total from API: {total_count}')
print(f'Fetched: {len(all_projects)}')

summary = {
    'totalProjects': len(all_projects),
    'completed': sum(1 for p in all_projects if p.get('status') == 'Completed'),
    'ongoing': sum(1 for p in all_projects if p.get('status') == 'On-Going'),
    'notStarted': sum(1 for p in all_projects if p.get('status') == 'Not Started'),
    'forProcurement': sum(1 for p in all_projects if p.get('status') == 'For Procurement'),
    'terminated': sum(1 for p in all_projects if p.get('status') == 'Terminated'),
    'totalBudget': sum(p.get('budget', 0) for p in all_projects),
}

output = {
    'fetchedAt': '2026-07-15T12:00:00Z',
    'summary': summary,
    'projects': all_projects,
}

with open(os.path.join(pages_dir, 'dpwh-tanay-projects.json'), 'w', encoding='utf-8') as f:
    json.dump(output, f, indent=2, ensure_ascii=False)

# Clean up temp files
for i in range(1, 5):
    path = os.path.join(pages_dir, f'dpwh-page-{i}.json')
    if os.path.exists(path):
        os.remove(path)

print(f'Saved to {os.path.join(pages_dir, \"dpwh-tanay-projects.json\")}')
print(f'Summary: {summary[\"totalProjects\"]} projects, \u20b1{summary[\"totalBudget\"]/1e6:.2f}M total budget')
"

endlocal