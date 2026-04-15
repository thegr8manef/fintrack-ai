# FinTrack AI

Production-grade architecture and delivery blueprint for a scalable mobile expense management platform.

## 1) High-level architecture (text diagram)

```text
[React Native Mobile App]
   | HTTPS (REST/GraphQL via JWT)
   v
[API Gateway + WAF + Rate Limiting]
   |---> [Auth Service]
   |---> [User Service]
   |---> [Transaction Service]
   |---> [Analytics Service]
   |---> [AI Recommendation Service]
   |---> [Notification Service]
   |---> [Receipt OCR Service]
   |---> [Currency Service]
   `---> [Bank Integration Service] (optional)

Internal async events (Kafka):
TransactionCreated, ReceiptProcessed, BudgetThresholdReached,
InsightGenerated, ExchangeRateUpdated, NotificationRequested

Data layer (database-per-service):
- PostgreSQL: auth, users, transactions, budgets, notifications metadata
- MongoDB: OCR receipts, extracted line items, semi-structured docs
- Redis: cache/session/token blacklist/rate-limit counters
- Elasticsearch: analytics/search index for fast reporting and querying

Observability:
Services -> OpenTelemetry -> Prometheus (metrics), ELK (logs), Grafana (dashboards)
```

## 2) Microservices breakdown

### API Gateway
- Single public entrypoint (versioned `/api/v1`)
- JWT validation, OAuth2 token forwarding, request routing
- Rate limiting, API key enforcement for partner APIs
- GraphQL federation optional for mobile aggregation

### Authentication & Authorization Service
- User registration/login, refresh token rotation
- OAuth2 (Google/Apple) + JWT issuance
- RBAC scopes (`user:read`, `txn:write`, `admin:*`)
- Stores credentials, MFA state, token revocation metadata

### User Service
- User profile, preferences, locale, default currency
- Financial goals and personalization settings
- Emits `UserPreferencesUpdated`

### Transaction Service
- Income/expense CRUD, merchant tagging, budgets
- AI-assisted categorization fallback rules
- Emits `TransactionCreated`, `TransactionUpdated`

### Analytics Service
- Daily/weekly/monthly aggregation pipeline
- Budget usage trends, category spend deltas, anomaly detection inputs
- Reads transaction events and writes optimized materialized views

### AI/Recommendation Service
- Categorization model inference and confidence scoring
- Smart insights: overspending warnings, forecasted cash flow
- Recommendation events: `InsightGenerated`

### Notification Service
- In-app/push/email/SMS orchestration
- Preference-aware delivery windows and retry policies
- Triggered by Kafka events (`BudgetThresholdReached`, `InsightGenerated`)

### Receipt/OCR Service
- Receipt image upload workflow + OCR extraction
- Line-item parsing + merchant/date/amount normalization
- Stores receipt docs in object storage + MongoDB metadata

### Currency/Exchange Service
- Pulls FX rates from provider APIs, caches in Redis
- Converts transaction amounts to base/user preferred currency
- Emits `ExchangeRateUpdated`

### Bank Integration Service (optional)
- Open Banking/Plaid-like aggregation
- Handles consent, account sync, webhook ingest, deduping

## 3) Tech stack and justification

- **Mobile:** React Native + TypeScript (single codebase iOS/Android, strong typing)
- **Backend services:** Node.js (NestJS/Fastify) or Go for high-throughput services
- **API:** REST for service primitives; GraphQL at gateway for mobile-optimized payloads
- **Async messaging:** Kafka (durable event streams, replayability, high throughput)
- **PostgreSQL:** ACID guarantees for financial records
- **MongoDB:** flexible schema for OCR/receipt documents
- **Redis:** low-latency cache/session/rate-limiter storage
- **Elasticsearch:** fast full-text and analytical querying
- **Cloud:** **AWS** (mature managed stack, broad integrations)
  - EKS (Kubernetes), ALB, S3, RDS/Aurora, MSK, ElastiCache, OpenSearch, CloudWatch

## 4) Database design (basic schema per service)

### Auth Service (PostgreSQL)
- `users_auth(id, email, password_hash, oauth_provider, mfa_enabled, created_at)`
- `refresh_tokens(id, user_id, token_hash, expires_at, revoked_at)`
- `roles(id, name)` / `user_roles(user_id, role_id)`

### User Service (PostgreSQL)
- `users(id, full_name, phone, locale, timezone, default_currency, created_at)`
- `preferences(user_id, budget_alert_enabled, insight_frequency, channels_jsonb)`

### Transaction Service (PostgreSQL)
- `accounts(id, user_id, type, provider_ref, currency)`
- `transactions(id, user_id, account_id, amount, currency, base_amount, category, merchant, txn_type, occurred_at)`
- `budgets(id, user_id, period, category, limit_amount, currency)`

### Analytics Service (Elasticsearch + Postgres metadata)
- ES index `spend_analytics` (user_id, date_bucket, category, amount, rolling_avg)
- `report_jobs(id, user_id, period, status, generated_at)`

### Receipt Service (MongoDB + S3)
- `receipts` document: `{ _id, userId, imageUrl, merchant, total, currency, tax, items[], purchasedAt, ocrConfidence }`

### Currency Service (PostgreSQL + Redis)
- `fx_rates(base, quote, rate, as_of)` composite key
- Redis key pattern: `fx:{base}:{quote}` with TTL

### Notification Service (PostgreSQL)
- `notification_templates(id, channel, template_key, body)`
- `notification_queue(id, user_id, channel, payload_jsonb, status, retry_count, scheduled_at)`

## 5) API structure examples

### Gateway routes
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `GET /api/v1/users/me`
- `POST /api/v1/transactions`
- `GET /api/v1/analytics/summary?range=monthly`
- `POST /api/v1/receipts/upload`
- `GET /api/v1/currency/rates?base=USD`

### Sample request/response

`POST /api/v1/transactions`
```json
{
  "amount": 42.85,
  "currency": "USD",
  "merchant": "Starbucks",
  "category": "food",
  "occurredAt": "2026-04-15T09:40:00Z"
}
```

```json
{
  "id": "txn_123",
  "status": "created",
  "aiCategorization": {
    "suggested": "food",
    "confidence": 0.94
  }
}
```

### Event contract sample (Kafka)
```json
{
  "eventType": "TransactionCreated",
  "eventId": "evt_001",
  "occurredAt": "2026-04-15T09:40:01Z",
  "payload": {
    "transactionId": "txn_123",
    "userId": "usr_7",
    "amount": 42.85,
    "currency": "USD",
    "category": "food"
  }
}
```

## 6) DevOps pipeline flow

1. **PR checks:** lint + unit tests + SAST + dependency scan
2. **Build:** Docker image per service, immutable tags (`git-sha`)
3. **Push:** image to ECR
4. **Deploy dev:** Helm/Kustomize to EKS dev namespace
5. **Integration tests:** contract + smoke + API tests
6. **Promote staging:** manual approval + canary
7. **Promote prod:** blue/green or progressive rollout
8. **Post-deploy:** synthetic checks + alert validation + rollback guardrails

Environment separation:
- `dev`, `staging`, `prod` with isolated namespaces/accounts, separate secrets and DBs

## 7) Recommended folder structure

```text
fintrack-ai/
  mobile-app/
    src/
      features/
      services/
      state/
      offline/
      navigation/
    android/
    ios/
  backend/
    api-gateway/
    services/
      auth-service/
      user-service/
      transaction-service/
      analytics-service/
      ai-recommendation-service/
      notification-service/
      receipt-ocr-service/
      currency-service/
      bank-integration-service/
    shared/
      contracts/
      observability/
      security/
  infra/
    terraform/
    kubernetes/
      base/
      overlays/dev/
      overlays/staging/
      overlays/prod/
    helm/
  ci/
    github-actions/
```

## 8) Security, scalability, reliability, and future improvements

### Security baseline
- HTTPS/TLS 1.2+ everywhere
- JWT short-lived access tokens + rotating refresh tokens
- Secrets in AWS Secrets Manager / Kubernetes Secrets (sealed)
- WAF + gateway rate limiting + input validation + schema enforcement

### Scalability & reliability
- Stateless services with Kubernetes HPA
- Kafka retries + DLQ patterns
- Circuit breakers/timeouts/retries for inter-service calls
- Multi-AZ managed data stores, regular backups, disaster recovery runbooks

### React Native state/offline strategy
- Redux Toolkit + RTK Query
- Local encrypted persistence (SQLite/MMKV)
- Offline queue for writes, background sync and conflict resolution by server timestamp/version

### Future improvements
- ML model retraining pipeline from anonymized feedback loops
- Personalized saving goals with scenario simulation
- Fraud/anomaly scoring service
- Feature flags + experimentation platform
- Regional data residency and multi-region active/active
