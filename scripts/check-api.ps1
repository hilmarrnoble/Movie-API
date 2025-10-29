# scripts/check-api.ps1

# ---- Base URLs ----
$SERVER_BASE = "http://localhost:5000"
$API_BASE  = "$SERVER_BASE/api"
$AUTH_BASE = "$SERVER_BASE/auth"

Write-Host "Checking health at $SERVER_BASE/health..."
try {
  $health = Invoke-RestMethod -Method Get -Uri "$SERVER_BASE/health" -TimeoutSec 3 -ErrorAction Stop
  Write-Host "Health:" ($health | ConvertTo-Json -Compress)
} catch {
  throw "API not reachable at $SERVER_BASE. Is 'npm run dev' running?"
}

# ---- Login (seed user) ----
$body  = @{ email = "jdoe@example.com"; password = "password1" } | ConvertTo-Json
Write-Host "Logging in at $AUTH_BASE/login..."
$login = Invoke-RestMethod -Method Post -Uri "$AUTH_BASE/login" -ContentType "application/json" -Body $body -ErrorAction Stop
$token = $login.token
if (-not $token) { throw "No token returned from server." }
Write-Host "Token acquired."

# ---- Movies ----
$headers = @{ Authorization = "Bearer $token" }
Write-Host "Fetching movies from $API_BASE/movies..."
$movies  = Invoke-RestMethod -Method Get -Uri "$API_BASE/movies" -Headers $headers -ErrorAction Stop

if ($movies.Count -eq 0) {
  Write-Warning "API returned 0 movies. Seeding DB..."
  pushd .
  try {
    npm run seed | Write-Host
  } finally { popd }
  $movies = Invoke-RestMethod -Method Get -Uri "$API_BASE/movies" -Headers $headers -ErrorAction Stop
}

Write-Host "Movie count:" $movies.Count
$movies | Format-Table title, releaseYear
