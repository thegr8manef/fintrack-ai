/**
 * Auth Service — Entry Point (Port 3001)
 *
 * Handles user authentication: registration, login, and JWT token management.
 * Uses PostgreSQL (fintrack_auth database) to store user credentials and
 * refresh tokens. Passwords are hashed with bcrypt (12 rounds).
 *
 * Endpoints:
 *   POST /auth/register  — Create new account, returns JWT tokens
 *   POST /auth/login     — Validate credentials, returns JWT tokens
 *   POST /auth/refresh   — Rotate refresh token, issue new access token
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AuthModule } from "./auth.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AuthModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3001;
  await app.listen(port, "0.0.0.0");
  console.log(`Auth Service running on port ${port}`);
}

bootstrap();
