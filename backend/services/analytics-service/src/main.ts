/**
 * Analytics Service — Entry Point (Port 3004)
 *
 * Provides spend aggregation and analytics over Elasticsearch.
 * Queries the 'spend_analytics' ES index for category-wise breakdowns.
 * Falls back to empty results when ES index isn't populated yet.
 *
 * Dependencies: PostgreSQL (fintrack_analytics), Elasticsearch
 *
 * Endpoints:
 *   GET /analytics/summary?userId=&range=monthly|weekly|daily
 *       — Returns category spend breakdown and total spend
 *
 * Status: Partial — Kafka consumers for populating ES are not yet wired.
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AnalyticsModule } from "./analytics.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AnalyticsModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3004;
  await app.listen(port, "0.0.0.0");
  console.log(`Analytics Service running on port ${port}`);
}

bootstrap();
