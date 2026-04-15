/**
 * AI Recommendation Service — Entry Point (Port 3005)
 *
 * Provides AI-powered financial insights:
 * - Transaction categorization based on merchant name keywords
 * - Spend insight generation with budget overspending alerts
 *
 * Stateless service — no database, uses Redis for caching (optional).
 *
 * Endpoints:
 *   POST /insights/categorize  — Suggest category from merchant name
 *   POST /insights/generate    — Generate budget insights from spend data
 *
 * Status: Heuristic-based only. No ML model integrated yet.
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AiModule } from "./ai.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AiModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3005;
  await app.listen(port, "0.0.0.0");
  console.log(`AI Recommendation Service running on port ${port}`);
}

bootstrap();
