# Fetch all DPWH Tanay projects
$UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
$headers = @{
    "Origin" = "https://transparency.dpwh.gov.ph"
    "Referer" = "https://transparency.dpwh.gov.ph/"
    "Accept" = "application/json"
}

Write-Host "Fetching DPWH projects for Tanay, Rizal..." -ForegroundColor Cyan

$allProjects = @()
$totalPages = 9
$totalCount = 0

for ($page = 1; $page -le $totalPages; $page++) {
    Write-Host "Fetching page $page/$totalPages..." -ForegroundColor Yellow
    $url = "https://api.transparency.dpwh.gov.ph/projects?search=Tanay&page=$page&per_page=20"
    $result = curl.exe -s -L -A "$UA" -H "Origin: https://transparency.dpwh.gov.ph" -H "Referer: https://transparency.dpwh.gov.ph/" -H "Accept: application/json" $url | ConvertFrom-Json -Depth 100
    
    if ($page -eq 1) {
        $totalCount = $result.data.pagination.totalCount
        $totalPages = $result.data.pagination.totalPages
        Write-Host "Total projects: $totalCount, pages: $totalPages" -ForegroundColor Green
    }
    
    $allProjects += $result.data.data
    Start-Sleep -Milliseconds 300
}

Write-Host "Fetched $($allProjects.Count) projects total." -ForegroundColor Green

# Build summary
$summary = @{
    totalProjects = $allProjects.Count
    completed = ($allProjects | Where-Object { $_.status -eq "Completed" }).Count
    ongoing = ($allProjects | Where-Object { $_.status -eq "On-Going" }).Count
    notStarted = ($allProjects | Where-Object { $_.status -eq "Not Started" }).Count
    forProcurement = ($allProjects | Where-Object { $_.status -eq "For Procurement" }).Count
    terminated = ($allProjects | Where-Object { $_.status -eq "Terminated" }).Count
    totalBudget = ($allProjects | Measure-Object -Property budget -Sum).Sum
}

$output = @{
    fetchedAt = (Get-Date -Format "o")
    summary = $summary
    projects = $allProjects
}

$outPath = "public/data/dpwh-tanay-projects.json"
$output | ConvertTo-Json -Depth 10 | Set-Content -Path $outPath -Encoding UTF8

Write-Host "Saved to $outPath" -ForegroundColor Green
Write-Host "Summary: $($summary.totalProjects) projects, ₱$([math]::Round($summary.totalBudget / 1e6, 2))M total budget" -ForegroundColor Green