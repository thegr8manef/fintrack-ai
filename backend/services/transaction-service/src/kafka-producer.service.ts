/**
 * Transaction Service — Kafka Producer
 *
 * Manages the Kafka producer connection lifecycle:
 * - Connects on module init, disconnects on module destroy
 * - emit(): Sends structured events to a Kafka topic
 *
 * Event format:
 * {
 *   eventType: "TransactionCreated",
 *   eventId:   "evt_<timestamp>",
 *   occurredAt: ISO timestamp,
 *   payload:   { transactionId, userId, amount, currency, category }
 * }
 *
 * Consumed by: analytics-service, notification-service, ai-recommendation-service
 */
import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { Kafka, Producer } from "kafkajs";

@Injectable()
export class KafkaProducerService implements OnModuleInit, OnModuleDestroy {
  private producer: Producer;

  constructor() {
    const kafka = new Kafka({
      clientId: "transaction-service",
      brokers: (process.env.KAFKA_BROKERS || "localhost:9092").split(","),
    });
    this.producer = kafka.producer();
  }

  async onModuleInit() {
    await this.producer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
  }

  async emit(topic: string, event: { eventType: string; payload: unknown }) {
    await this.producer.send({
      topic,
      messages: [
        {
          key: event.eventType,
          value: JSON.stringify({
            eventType: event.eventType,
            eventId: `evt_${Date.now()}`,
            occurredAt: new Date().toISOString(),
            payload: event.payload,
          }),
        },
      ],
    });
  }
}
