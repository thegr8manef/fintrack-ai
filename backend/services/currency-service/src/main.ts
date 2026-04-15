/**
 * Currency Service — Entry Point (Port 3008)
 *
 * Manages foreign exchange rates and currency conversion.
 * Uses PostgreSQL (fintrack_currency) for rate storage and Redis
 * for a hot cache layer (3600s TTL).
 *
 * Endpoints:
 *   GET /currency/rates?base=USD                      — All rates for a base currency
 *   GET /currency/convert?amount=100&from=USD&to=EUR  — Convert amount between currencies
 *
 * Caching Strategy:
 *   L1: Redis (hot cache, 1 hour TTL)
 *   L2: PostgreSQL (cold storage, persistent)
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { CurrencyModule } from "./currency.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    CurrencyModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3008;
  await app.listen(port, "0.0.0.0");
  console.log(`Currency Service running on port ${port}`);
}

bootstrap();
