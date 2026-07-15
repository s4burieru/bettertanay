#!/usr/bin/env python3
"""
Fetch all DPWH infrastructure projects for Tanay, Rizal
and save as static JSON for the Transparency page.
Usage: python scripts/fetch-dpwh-data.py
"""

import json
import os
import sys
import time
import urllib.request

BASE_URL = 'https://api.transparency.dpwh.gov.ph'

def make_request(url):
    """Make a request with browser-like headers."""
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Origin': 'https://transparency.dpwh.gov.ph',
        'Referer': 'https://transparency.dpwh.gov.ph/',
        'Accept': 'application/json',
    }
    req = urllib.request.Request(url, headers=headers)
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read().decode('utf-8'))


def main():
    print('Fetching DPWH projects for Tanay, Rizal...')

    # First get total count
    first = make_request(f'{BASE_URL}/projects?search=Tanay&page=1&per_page=50')
    total_count = first['data']['pagination']['totalCount']
    total_pages = (total_count + 49) // 50  # ceil division
    print(f'Total projects: {total_count}, pages: {total_pages}')

    all_projects = list(first['data']['data'])

    # Fetch remaining pages
    for page in range(2, total_pages + 1):
        print(f'Fetching page {page}/{total_pages}...')
        time.sleep(0.5)  # be respectful
        data = make_request(f'{BASE_URL}/projects?search=Tanay&page={page}&per_page=50')
        all_projects.extend(data['data']['data'])

    print(f'Fetched {len(all_projects)} projects total.')

    # Build summary
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
        'fetchedAt': time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
        'summary': summary,
        'projects': all_projects,
    }

    out_dir = os.path.join(os.getcwd(), 'public', 'data')
    os.makedirs(out_dir, exist_ok=True)
    out_path = os.path.join(out_dir, 'dpwh-tanay-projects.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f'Saved to {out_path}')
    print(f'Summary: {summary["totalProjects"]} projects, '
          f'₱{summary["totalBudget"] / 1e6:.2f}M total budget')


if __name__ == '__main__':
    main()