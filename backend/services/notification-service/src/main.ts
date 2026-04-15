/**
 * Notification Service — Entry Point (Port 3006)
 *
 * Multi-channel notification orchestration service.
 * Manages a queue of notifications to be delivered via push, email, SMS, or in-app.
 * Uses PostgreSQL (fintrack_notifications) for queue persistence and template storage.
 *
 * Endpoints:
 *   POST /notifications         — Enqueue a notification for delivery
 *   GET  /notifications/pending — Fetch pending notifications (for delivery workers)
 *
 * Status: Queue infrastructure ready. Delivery channels (Twilio, SendGrid, FCM)
 * are not yet implemented.
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { NotificationModule } from "./notification.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    NotificationModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3006;
  await app.listen(port, "0.0.0.0");
  console.log(`Notification Service running on port ${port}`);
}

bootstrap();
