/**
 * Shared Contracts — Kafka Event Types
 *
 * Defines the event schema for the async event-driven architecture.
 * All events extend BaseEvent with eventType, eventId, occurredAt, and payload.
 *
 * Events:
 * - TransactionCreated:       Emitted by transaction-service on new transaction
 * - TransactionUpdated:       Emitted when a transaction is modified
 * - ReceiptProcessed:         Emitted by receipt-ocr-service after OCR processing
 * - BudgetThresholdReached:   Emitted when user spending exceeds budget threshold
 * - InsightGenerated:         Emitted by AI-service with new insights
 * - ExchangeRateUpdated:      Emitted by currency-service on rate changes
 * - NotificationRequested:    Emitted to trigger notification delivery
 *
 * Kafka Topics: transactions, receipts, budgets, insights, exchange-rates, notifications
 */
export interface BaseEvent {
  eventType: string;
  eventId: string;
  occurredAt: string;
  payload: unknown;
}

export interface TransactionCreatedEvent extends BaseEvent {
  eventType: "TransactionCreated";
  payload: {
    transactionId: string;
    userId: string;
    amount: number;
    currency: string;
    category: string;
  };
}

export interface TransactionUpdatedEvent extends BaseEvent {
  eventType: "TransactionUpdated";
  payload: {
    transactionId: string;
    userId: string;
    changes: Record<string, unknown>;
  };
}

export interface ReceiptProcessedEvent extends BaseEvent {
  eventType: "ReceiptProcessed";
  payload: {
    receiptId: string;
    userId: string;
    merchant: string;
    total: number;
    currency: string;
    ocrConfidence: number;
  };
}

export interface BudgetThresholdReachedEvent extends BaseEvent {
  eventType: "BudgetThresholdReached";
  payload: {
    userId: string;
    budgetId: string;
    category: string;
    usedPercent: number;
  };
}

export interface InsightGeneratedEvent extends BaseEvent {
  eventType: "InsightGenerated";
  payload: {
    userId: string;
    insightType: string;
    message: string;
    severity: "low" | "medium" | "high";
  };
}

export interface ExchangeRateUpdatedEvent extends BaseEvent {
  eventType: "ExchangeRateUpdated";
  payload: {
    base: string;
    quote: string;
    rate: number;
  };
}

export interface NotificationRequestedEvent extends BaseEvent {
  eventType: "NotificationRequested";
  payload: {
    userId: string;
    channel: string;
    templateKey: string;
    data: Record<string, unknown>;
  };
}

export type FinTrackEvent =
  | TransactionCreatedEvent
  | TransactionUpdatedEvent
  | ReceiptProcessedEvent
  | BudgetThresholdReachedEvent
  | InsightGeneratedEvent
  | ExchangeRateUpdatedEvent
  | NotificationRequestedEvent;

export const KAFKA_TOPICS = {
  TRANSACTIONS: "transactions",
  RECEIPTS: "receipts",
  BUDGETS: "budgets",
  INSIGHTS: "insights",
  EXCHANGE_RATES: "exchange-rates",
  NOTIFICATIONS: "notifications",
} as const;
