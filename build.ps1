# Build all backend service Docker images sequentially
# This avoids network saturation from parallel npm installs

$services = @(
    @{ name = "api-gateway";               path = "backend/api-gateway" },
    @{ name = "auth-service";              path = "backend/services/auth-service" },
    @{ name = "user-service";              path = "backend/services/user-service" },
    @{ name = "transaction-service";       path = "backend/services/transaction-service" },
    @{ name = "analytics-service";         path = "backend/services/analytics-service" },
    @{ name = "ai-recommendation-service"; path = "backend/services/ai-recommendation-service" },
    @{ name = "notification-service";      path = "backend/services/notification-service" },
    @{ name = "receipt-ocr-service";       path = "backend/services/receipt-ocr-service" },
    @{ name = "currency-service";          path = "backend/services/currency-service" }
)

$failed = @()

foreach ($svc in $services) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Building: $($svc.name)" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan

    docker build -t "fintrack-ai-$($svc.name)" "./$($svc.path)"

    if ($LASTEXITCODE -ne 0) {
        Write-Host "FAILED: $($svc.name)" -ForegroundColor Red
        $failed += $svc.name
    } else {
        Write-Host "SUCCESS: $($svc.name)" -ForegroundColor Green
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
if ($failed.Count -gt 0) {
    Write-Host "Failed services: $($failed -join ', ')" -ForegroundColor Red
    exit 1
} else {
    Write-Host "All services built successfully!" -ForegroundColor Green
    Write-Host "Run 'docker-compose up -d' to start" -ForegroundColor Yellow
}
