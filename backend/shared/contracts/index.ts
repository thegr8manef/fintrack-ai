/**
 * Shared Contracts — Barrel Export
 *
 * Re-exports all shared types and constants from a single entry point.
 * Import from '@shared/contracts' in any microservice.
 */
export { FinTrackEvent, KAFKA_TOPICS } from "./events";
export type {
  BaseEvent,
  TransactionCreatedEvent,
  TransactionUpdatedEvent,
  ReceiptProcessedEvent,
  BudgetThresholdReachedEvent,
  InsightGeneratedEvent,
  ExchangeRateUpdatedEvent,
  NotificationRequestedEvent,
} from "./events";

export type {
  ServiceHealthResponse,
  PaginatedResponse,
  ApiErrorResponse,
} from "./api";
