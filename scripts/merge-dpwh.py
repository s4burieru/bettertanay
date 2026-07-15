import json, os

pages_dir = 'public/data'
all_projects = []
first = None

for i in range(1, 10):
    path = os.path.join(pages_dir, f'dpwh-p{i}.json')
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    if first is None:
        first = data
    all_projects.extend(data['data']['data'])
    print(f'Page {i}: {len(data["data"]["data"])} projects')

print(f'Total fetched: {len(all_projects)}')

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

# Clean temp files
for i in range(1, 10):
    os.remove(os.path.join(pages_dir, f'dpwh-p{i}.json'))

print(f'Saved! Summary: {summary["totalProjects"]} projects, \u20b1{summary["totalBudget"]/1e6:.2f}M total budget')