# FinTrack AI — Setup & Run Commands

## Prerequisites

Install the following before starting:

- **Node.js 20+** — [https://nodejs.org/](https://nodejs.org/)
- **Docker Desktop** — [https://docs.docker.com/get-docker/](https://docs.docker.com/get-docker/)
- **React Native CLI + Android/iOS environment** — [https://reactnative.dev/docs/environment-setup](https://reactnative.dev/docs/environment-setup)
- **Java 17+** (for Android builds)

> **Windows users:** Make sure Docker Desktop is running before executing any `docker-compose` commands.

---

## 1. Clone & Navigate

```bash
git clone <your-repo-url>
cd fintrack-ai
```

---

## 2. Start Everything via Docker Compose

The simplest way to run the full backend stack:

```bash
docker-compose up -d
```

This starts:

- **Infrastructure**: PostgreSQL 16, MongoDB 7, Redis 7, Kafka 7.6, Zookeeper, Elasticsearch 8.13
- **All 9 backend services**: API Gateway + 8 microservices

> **Note:** On first start, PostgreSQL automatically creates all required databases (`fintrack_auth`, `fintrack_users`, `fintrack_transactions`, `fintrack_analytics`, `fintrack_notifications`, `fintrack_currency`) via the init script at `infra/postgres/init-databases.sh`.

Verify everything is running:

```bash
docker-compose ps
```

### If Docker builds fail (network issues)

If parallel builds saturate Docker networking, use the sequential build script:

```powershell
# PowerShell (Windows)
.\build.ps1

# Then start services
docker-compose up -d
```

### Rebuild a specific service

```bash
docker-compose build --no-cache <service-name>
docker-compose up -d <service-name>
```

---

## 3. Start Infrastructure Only (for local development)

If you prefer running backend services locally (outside Docker):

```bash
docker-compose up -d postgres mongodb redis zookeeper kafka elasticsearch
```

---

## 4. Backend Services (Local Development)

### Install dependencies (run once per service)

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
foreach ($s in $services) { Push-Location $s; npm install --legacy-peer-deps; Pop-Location }
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

## 5. Mobile App

```bash
cd mobile-app

# Install dependencies
npm install --legacy-peer-deps

# Start Metro bundler
npx react-native start

# In a separate terminal — run on Android
npx react-native run-android

# iOS (macOS only)
cd ios && pod install && cd ..
npx react-native run-ios
```

> **Tip:** If the Gradle build fails on Windows with a workspace move error, delete the cache:
>
> ```powershell
> Remove-Item -Recurse -Force mobile-app\android\.gradle
> ```

---

## 6. Database Management UIs

Three database dashboards are included in the Docker Compose stack for easy data inspection:

### pgAdmin (PostgreSQL)

- **URL:** [http://localhost:5050](http://localhost:5050)
- **Login:** `admin@fintrack.ai` / `admin`
- The FinTrack PostgreSQL server is pre-configured. On first login, enter the password `fintrack_dev` when prompted.
- Browse all 6 databases: `fintrack_auth`, `fintrack_users`, `fintrack_transactions`, `fintrack_analytics`, `fintrack_notifications`, `fintrack_currency`

### Mongo Express (MongoDB)

- **URL:** [http://localhost:8083](http://localhost:8083)
- No login required. Browse the `fintrack_receipts` database and receipt documents.

### Redis Commander

- **URL:** [http://localhost:8082](http://localhost:8082)
- No login required. View cached FX rates, session data, and rate-limiting keys.

> **Tip:** To start only the DB UIs without rebuilding services:
>
> ```bash
> docker compose up -d pgadmin mongo-express redis-commander
> ```

---

## 7. Seed Demo Data

A demo user and realistic mock data are available for testing:

```bash
# Seed via SQL file (all databases at once)
docker cp infra/postgres/seed-data.sql fintrack-ai-postgres-1:/tmp/seed-data.sql
docker exec fintrack-ai-postgres-1 psql -U fintrack -f /tmp/seed-data.sql
```

This seeds:

- **Demo user:** `demo@fintrack.ai` / `Demo@123`
- **35 transactions** across 7 categories (food, transport, shopping, entertainment, utilities, health, income)
- **6 monthly budgets** with realistic limits
- **15 FX rate pairs** (USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, INR, BRL, MXN)
- **5 notification templates** and sample queued notifications
- **User preferences** with budget alerts enabled

Or register the demo user first, then seed manually:

```bash
# Register demo user via API
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"demo@fintrack.ai","password":"Demo@123"}'
```

---

## 8. Verify Services Are Running

```bash
# Health check (API Gateway)
curl http://localhost:3000/api/v1/health

# Register a test user (via gateway)
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'

# Login (via gateway)
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'

# Test AI categorization (via gateway)
curl -X POST http://localhost:3000/api/v1/insights/categorize \
  -H "Content-Type: application/json" \
  -d '{"merchant":"Starbucks"}'

# Direct service access (bypassing gateway)
curl http://localhost:3001/auth/login  # Auth Service
curl http://localhost:3008/currency/rates?base=USD  # Currency Service
```

---

## 9. Run Tests

```bash
# Per service
cd backend/services/auth-service && npm test

# Mobile app
cd mobile-app && npm test
```

---

## 10. Lint

```bash
# Per service
cd backend/api-gateway && npm run lint

# Mobile app
cd mobile-app && npm run lint
```

---

## 11. Build for Production

```bash
# Build a single service
cd backend/services/auth-service && npm run build

# Build Docker image
docker build -t fintrack/auth-service:latest ./backend/services/auth-service
```

---

## 12. Infrastructure (Terraform)

```bash
cd infra/terraform

terraform init
terraform plan -var="environment=dev"
terraform apply -var="environment=dev"
```

---

## 13. Kubernetes Deployment

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
| **pgAdmin**               | 5050  |
| **Mongo Express**         | 8083  |
| **Redis Commander**       | 8082  |
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
