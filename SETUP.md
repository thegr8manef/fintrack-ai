# FinTrack AI — Setup & Run Commands

## Prerequisites

Install the following before starting:

```bash
# Node.js 20+
# https://nodejs.org/

# Docker & Docker Compose
# https://docs.docker.com/get-docker/

# React Native CLI + environment
# https://reactnative.dev/docs/environment-setup
```

---

## 1. Clone & Navigate

```bash
git clone <your-repo-url>
cd fintrack-ai
```

---

## 2. Start Infrastructure (Docker)

Spin up Postgres, MongoDB, Redis, Kafka, Elasticsearch:

```bash
docker-compose up -d postgres mongodb redis zookeeper kafka elasticsearch
```

Verify all containers are running:

```bash
docker-compose ps
```

---

## 3. Backend Services

### Install dependencies (run once per service)

```bash
cd backend/api-gateway && npm install && cd ../..
cd backend/services/auth-service && npm install && cd ../../..
cd backend/services/user-service && npm install && cd ../../..
cd backend/services/transaction-service && npm install && cd ../../..
cd backend/services/analytics-service && npm install && cd ../../..
cd backend/services/ai-recommendation-service && npm install && cd ../../..
cd backend/services/notification-service && npm install && cd ../../..
cd backend/services/receipt-ocr-service && npm install && cd ../../..
cd backend/services/currency-service && npm install && cd ../../..
cd backend/services/bank-integration-service && npm install && cd ../../..
```

Or install all at once (PowerShell):

```powershell
$services = @(
  "backend/api-gateway",
  "backend/services/auth-service",
  "backend/services/user-service",
  "backend/services/transaction-service",
  "backend/services/analytics-service",
  "backend/services/ai-recommendation-service",
  "backend/services/notification-service",
  "backend/services/receipt-ocr-service",
  "backend/services/currency-service",
  "backend/services/bank-integration-service"
)
foreach ($s in $services) { Push-Location $s; npm install; Pop-Location }
```

### Run individual services (dev mode)

Each service runs on its own port. Open separate terminals:

```bash
# Terminal 1 — API Gateway (port 3000)
cd backend/api-gateway && npm run dev

# Terminal 2 — Auth Service (port 3001)
cd backend/services/auth-service && npm run dev

# Terminal 3 — User Service (port 3002)
cd backend/services/user-service && npm run dev

# Terminal 4 — Transaction Service (port 3003)
cd backend/services/transaction-service && npm run dev

# Terminal 5 — Analytics Service (port 3004)
cd backend/services/analytics-service && npm run dev

# Terminal 6 — AI Recommendation Service (port 3005)
cd backend/services/ai-recommendation-service && npm run dev

# Terminal 7 — Notification Service (port 3006)
cd backend/services/notification-service && npm run dev

# Terminal 8 — Receipt OCR Service (port 3007)
cd backend/services/receipt-ocr-service && npm run dev

# Terminal 9 — Currency Service (port 3008)
cd backend/services/currency-service && npm run dev
```

### Or run ALL services via Docker Compose

```bash
docker-compose up -d
```

---

## 4. Mobile App

```bash
cd mobile-app

# Install dependencies
npm install

# iOS (macOS only)
cd ios && pod install && cd ..
npm run ios

# Android
npm run android

# Start Metro bundler only
npm start
```

---

## 5. Verify Services Are Running

```bash
# Health check (API Gateway)
curl http://localhost:3000/api/v1/health

# Test login
curl -X POST http://localhost:3001/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'

# Test transaction creation
curl -X POST http://localhost:3003/transactions \
  -H "Content-Type: application/json" \
  -d '{"userId":"<user-id>","amount":42.85,"currency":"USD","merchant":"Starbucks","category":"food","occurredAt":"2026-04-15T09:40:00Z"}'

# Test AI categorization
curl -X POST http://localhost:3005/insights/categorize \
  -H "Content-Type: application/json" \
  -d '{"merchant":"Starbucks"}'

# Test currency rates
curl http://localhost:3008/currency/rates?base=USD
```

---

## 6. Run Tests

```bash
# Per service
cd backend/services/auth-service && npm test

# Mobile app
cd mobile-app && npm test
```

---

## 7. Lint

```bash
# Per service
cd backend/api-gateway && npm run lint

# Mobile app
cd mobile-app && npm run lint
```

---

## 8. Build for Production

```bash
# Build a single service
cd backend/services/auth-service && npm run build

# Build Docker image
docker build -t fintrack/auth-service:latest ./backend/services/auth-service
```

---

## 9. Infrastructure (Terraform)

```bash
cd infra/terraform

terraform init
terraform plan -var="environment=dev"
terraform apply -var="environment=dev"
```

---

## 10. Kubernetes Deployment

```bash
# Dev
kubectl apply -k infra/kubernetes/overlays/dev/

# Staging
kubectl apply -k infra/kubernetes/overlays/staging/

# Production
kubectl apply -k infra/kubernetes/overlays/prod/
```

---

## Service Ports Reference

| Service                   | Port  |
| ------------------------- | ----- |
| API Gateway               | 3000  |
| Auth Service              | 3001  |
| User Service              | 3002  |
| Transaction Service       | 3003  |
| Analytics Service         | 3004  |
| AI Recommendation Service | 3005  |
| Notification Service      | 3006  |
| Receipt OCR Service       | 3007  |
| Currency Service          | 3008  |
| Bank Integration Service  | 3009  |
| PostgreSQL                | 5432  |
| MongoDB                   | 27017 |
| Redis                     | 6379  |
| Kafka                     | 9092  |
| Elasticsearch             | 9200  |

---

## Environment Variables

Each service reads from environment variables. For local dev, defaults are built in. For production, set:

| Variable            | Used By                      | Description                         |
| ------------------- | ---------------------------- | ----------------------------------- |
| `PORT`              | All services                 | Service listen port                 |
| `DATABASE_URL`      | PG services                  | PostgreSQL connection string        |
| `MONGODB_URL`       | Receipt OCR                  | MongoDB connection string           |
| `REDIS_URL`         | Gateway, Auth, Currency      | Redis connection string             |
| `KAFKA_BROKERS`     | Transaction, Analytics, etc. | Kafka broker addresses              |
| `ELASTICSEARCH_URL` | Analytics                    | Elasticsearch endpoint              |
| `JWT_SECRET`        | Auth, shared guard           | JWT signing secret (change in prod) |
| `NODE_ENV`          | All services                 | `development` / `production`        |
