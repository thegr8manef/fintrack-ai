-- =============================================================================
-- FinTrack AI — Mock Seed Data
-- =============================================================================
-- Populates the databases with realistic demo data for the mobile app.
-- Run: docker exec fintrack-ai-postgres-1 psql -U fintrack -f /seed-data.sql
-- Or copy into container and execute.
--
-- Demo User: demo@fintrack.ai / Demo@123
-- User ID:   324eb70d-5ec3-463e-b41f-110d335aaf41
-- =============================================================================

-- ---------------------------------------------------------------------------
-- 1. USER PROFILE (fintrack_users database)
-- ---------------------------------------------------------------------------
\c fintrack_users

INSERT INTO users (id, full_name, phone, locale, timezone, default_currency)
VALUES ('324eb70d-5ec3-463e-b41f-110d335aaf41', 'Alex Morgan', '+1-555-0142', 'en', 'America/New_York', 'USD')
ON CONFLICT (id) DO UPDATE SET full_name = 'Alex Morgan', phone = '+1-555-0142';

INSERT INTO preferences (user_id, budget_alert_enabled, insight_frequency)
VALUES ('324eb70d-5ec3-463e-b41f-110d335aaf41', true, 'weekly')
ON CONFLICT (user_id) DO NOTHING;

-- ---------------------------------------------------------------------------
-- 2. TRANSACTIONS (fintrack_transactions database)
-- ---------------------------------------------------------------------------
\c fintrack_transactions

-- Income transactions (salary, freelance, etc.)
INSERT INTO transactions (id, user_id, amount, currency, category, merchant, txn_type, occurred_at) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 4500.00, 'USD', 'income', 'TechCorp Inc', 'income', NOW() - INTERVAL '1 day'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 1200.00, 'USD', 'income', 'Freelance Project', 'income', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 250.00, 'USD', 'income', 'Stock Dividends', 'income', NOW() - INTERVAL '12 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 4500.00, 'USD', 'income', 'TechCorp Inc', 'income', NOW() - INTERVAL '16 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 85.00, 'USD', 'income', 'Cash Refund', 'income', NOW() - INTERVAL '20 days');

-- Food & Dining expenses
INSERT INTO transactions (id, user_id, amount, currency, category, merchant, txn_type, occurred_at) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 5.75, 'USD', 'food', 'Starbucks', 'expense', NOW() - INTERVAL '0 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 32.50, 'USD', 'food', 'Chipotle Mexican Grill', 'expense', NOW() - INTERVAL '1 day'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 67.80, 'USD', 'food', 'Whole Foods Market', 'expense', NOW() - INTERVAL '2 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 14.99, 'USD', 'food', 'Uber Eats', 'expense', NOW() - INTERVAL '3 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 8.50, 'USD', 'food', 'Dunkin Donuts', 'expense', NOW() - INTERVAL '4 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 45.00, 'USD', 'food', 'The Italian Kitchen', 'expense', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 92.30, 'USD', 'food', 'Costco Grocery', 'expense', NOW() - INTERVAL '8 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 6.25, 'USD', 'food', 'Starbucks', 'expense', NOW() - INTERVAL '10 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 28.90, 'USD', 'food', 'Panera Bread', 'expense', NOW() - INTERVAL '14 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 55.00, 'USD', 'food', 'DoorDash', 'expense', NOW() - INTERVAL '18 days');

-- Transport expenses
INSERT INTO transactions (id, user_id, amount, currency, category, merchant, txn_type, occurred_at) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 18.50, 'USD', 'transport', 'Uber', 'expense', NOW() - INTERVAL '0 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 45.00, 'USD', 'transport', 'Shell Gas Station', 'expense', NOW() - INTERVAL '3 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 12.75, 'USD', 'transport', 'Lyft', 'expense', NOW() - INTERVAL '5 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 127.00, 'USD', 'transport', 'Monthly Metro Pass', 'expense', NOW() - INTERVAL '15 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 22.00, 'USD', 'transport', 'Parking Garage', 'expense', NOW() - INTERVAL '19 days');

-- Shopping expenses
INSERT INTO transactions (id, user_id, amount, currency, category, merchant, txn_type, occurred_at) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 89.99, 'USD', 'shopping', 'Amazon', 'expense', NOW() - INTERVAL '2 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 156.00, 'USD', 'shopping', 'Nike Store', 'expense', NOW() - INTERVAL '7 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 34.99, 'USD', 'shopping', 'Target', 'expense', NOW() - INTERVAL '11 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 249.00, 'USD', 'shopping', 'Apple Store', 'expense', NOW() - INTERVAL '22 days');

-- Entertainment expenses
INSERT INTO transactions (id, user_id, amount, currency, category, merchant, txn_type, occurred_at) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 15.99, 'USD', 'entertainment', 'Netflix', 'expense', NOW() - INTERVAL '1 day'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 10.99, 'USD', 'entertainment', 'Spotify Premium', 'expense', NOW() - INTERVAL '1 day'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 24.00, 'USD', 'entertainment', 'AMC Cinemas', 'expense', NOW() - INTERVAL '9 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 65.00, 'USD', 'entertainment', 'Concert Tickets', 'expense', NOW() - INTERVAL '13 days');

-- Utilities expenses
INSERT INTO transactions (id, user_id, amount, currency, category, merchant, txn_type, occurred_at) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 120.00, 'USD', 'utilities', 'Electric Company', 'expense', NOW() - INTERVAL '4 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 79.99, 'USD', 'utilities', 'Verizon Internet', 'expense', NOW() - INTERVAL '4 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 45.00, 'USD', 'utilities', 'Water Utility', 'expense', NOW() - INTERVAL '15 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 1850.00, 'USD', 'utilities', 'Rent Payment', 'expense', NOW() - INTERVAL '1 day');

-- Health expenses
INSERT INTO transactions (id, user_id, amount, currency, category, merchant, txn_type, occurred_at) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 49.99, 'USD', 'health', 'Planet Fitness', 'expense', NOW() - INTERVAL '1 day'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 25.00, 'USD', 'health', 'CVS Pharmacy', 'expense', NOW() - INTERVAL '6 days'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 150.00, 'USD', 'health', 'Dr. Smith Office', 'expense', NOW() - INTERVAL '17 days');

-- ---------------------------------------------------------------------------
-- 3. BUDGETS (fintrack_transactions database)
-- ---------------------------------------------------------------------------
INSERT INTO budgets (id, user_id, period, category, limit_amount, currency) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 'monthly', 'food', 500.00, 'USD'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 'monthly', 'transport', 300.00, 'USD'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 'monthly', 'shopping', 400.00, 'USD'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 'monthly', 'entertainment', 150.00, 'USD'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 'monthly', 'utilities', 2200.00, 'USD'),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 'monthly', 'health', 250.00, 'USD')
ON CONFLICT DO NOTHING;

-- ---------------------------------------------------------------------------
-- 4. FX RATES (fintrack_currency database)
-- ---------------------------------------------------------------------------
\c fintrack_currency

INSERT INTO fx_rates (base, quote, rate, as_of) VALUES
  ('USD', 'EUR', 0.9234, NOW()),
  ('USD', 'GBP', 0.7891, NOW()),
  ('USD', 'JPY', 157.42, NOW()),
  ('USD', 'CAD', 1.3645, NOW()),
  ('USD', 'AUD', 1.5312, NOW()),
  ('USD', 'CHF', 0.8876, NOW()),
  ('USD', 'CNY', 7.2456, NOW()),
  ('USD', 'INR', 83.45, NOW()),
  ('USD', 'BRL', 4.9723, NOW()),
  ('USD', 'MXN', 17.18, NOW()),
  ('EUR', 'USD', 1.0830, NOW()),
  ('EUR', 'GBP', 0.8546, NOW()),
  ('EUR', 'JPY', 170.51, NOW()),
  ('GBP', 'USD', 1.2673, NOW()),
  ('GBP', 'EUR', 1.1702, NOW())
ON CONFLICT (base, quote) DO UPDATE SET rate = EXCLUDED.rate, as_of = NOW();

-- ---------------------------------------------------------------------------
-- 5. NOTIFICATION TEMPLATES (fintrack_notifications database)
-- ---------------------------------------------------------------------------
\c fintrack_notifications

INSERT INTO notification_templates (id, channel, template_key, body) VALUES
  (gen_random_uuid(), 'push', 'budget_alert', 'You have used {{percent}}% of your {{category}} budget this month.'),
  (gen_random_uuid(), 'push', 'transaction_created', 'New {{txnType}}: ${{amount}} at {{merchant}}'),
  (gen_random_uuid(), 'email', 'welcome', 'Welcome to FinTrack AI, {{name}}! Start tracking your finances today.'),
  (gen_random_uuid(), 'push', 'insight_ready', 'New AI insight available: {{message}}'),
  (gen_random_uuid(), 'email', 'monthly_report', 'Your monthly spending report for {{month}} is ready.')
ON CONFLICT (template_key) DO NOTHING;

-- Sample pending notifications
INSERT INTO notification_queue (id, user_id, channel, payload, status, retry_count, scheduled_at) VALUES
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 'push', '{"title":"Budget Alert","body":"You have used 85% of your food budget this month."}', 'pending', 0, NOW()),
  (gen_random_uuid(), '324eb70d-5ec3-463e-b41f-110d335aaf41', 'push', '{"title":"AI Insight","body":"Your transport spending decreased by 12% this month. Great job!"}', 'pending', 0, NOW())
ON CONFLICT DO NOTHING;
