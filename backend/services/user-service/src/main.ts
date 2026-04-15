/**
 * User Service — Entry Point (Port 3002)
 *
 * Manages user profiles and preferences. Separate from auth-service
 * (which owns credentials). This service owns personal information
 * like name, phone, locale, timezone, and default currency.
 *
 * Endpoints:
 *   GET  /users/:id              — Fetch user profile
 *   PUT  /users/:id              — Update user profile
 *   GET  /users/:id/preferences  — Get notification/budget preferences
 *   PUT  /users/:id/preferences  — Upsert user preferences
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { UserModule } from "./user.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    UserModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3002;
  await app.listen(port, "0.0.0.0");
  console.log(`User Service running on port ${port}`);
}

bootstrap();
