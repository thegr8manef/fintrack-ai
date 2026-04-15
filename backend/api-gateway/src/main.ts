/**
 * API Gateway — Entry Point
 *
 * Bootstraps the NestJS application using Fastify as the HTTP adapter.
 * The gateway is the single entry point for all client requests (mobile app, web).
 * It listens on port 3000 (configurable via PORT env var) and routes
 * incoming requests to the appropriate downstream microservice via ProxyModule.
 *
 * Global prefix: /api/v1
 * CORS: enabled for cross-origin mobile/web requests
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.setGlobalPrefix("api/v1");
  app.enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port, "0.0.0.0");
  console.log(`API Gateway running on port ${port}`);
}

bootstrap();
