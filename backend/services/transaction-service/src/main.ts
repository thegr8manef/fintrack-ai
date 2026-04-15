/**
 * Transaction Service — Entry Point (Port 3003)
 *
 * Core financial service that manages transactions and budgets.
 * Uses PostgreSQL (fintrack_transactions) for storage and emits
 * Kafka events on the 'transactions' topic for downstream consumers
 * (analytics, notifications, AI insights).
 *
 * Endpoints:
 *   POST   /transactions           — Create transaction + emit Kafka event
 *   GET    /transactions?userId=    — Paginated list (default 20/page)
 *   GET    /transactions/:id        — Single transaction by ID
 *   DELETE /transactions/:id        — Delete transaction
 *   GET    /budgets/:userId         — List user budgets
 *   POST   /budgets                 — Create budget
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { TransactionModule } from "./transaction.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    TransactionModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3003;
  await app.listen(port, "0.0.0.0");
  console.log(`Transaction Service running on port ${port}`);
}

bootstrap();
