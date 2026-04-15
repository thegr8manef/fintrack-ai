#!/bin/bash
# =============================================================================
# FinTrack AI — PostgreSQL Database Initialization Script
#
# Automatically executed when the PostgreSQL container starts for the first time.
# Mounted into the container at /docker-entrypoint-initdb.d/init-databases.sh.
#
# Creates separate databases for each microservice:
#   - fintrack_auth:          Auth service (user credentials, refresh tokens)
#   - fintrack_users:         User service (profiles, preferences)
#   - fintrack_transactions:  Transaction service (transactions, budgets, accounts)
#   - fintrack_analytics:     Analytics service (report jobs)
#   - fintrack_notifications: Notification service (queue, templates)
#   - fintrack_currency:      Currency service (FX rates)
#
# Each service uses its own database for data isolation (microservice pattern).
# =============================================================================
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE DATABASE fintrack_auth;
    CREATE DATABASE fintrack_users;
    CREATE DATABASE fintrack_transactions;
    CREATE DATABASE fintrack_analytics;
    CREATE DATABASE fintrack_notifications;
    CREATE DATABASE fintrack_currency;
EOSQL
