/**
 * Receipt OCR Service — Entry Point (Port 3007)
 *
 * Handles receipt image upload and OCR text extraction.
 * Uses MongoDB (fintrack_receipts) for document storage.
 *
 * Endpoints:
 *   POST /receipts/upload      — Upload receipt image URL (OCR placeholder)
 *   GET  /receipts?userId=     — List user receipts (newest first)
 *   GET  /receipts/:id         — Get single receipt details
 *
 * Status: Schema and CRUD ready. Actual OCR processing (AWS Textract)
 * is NOT yet implemented — currently stores image URL only.
 */
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ReceiptModule } from "./receipt.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ReceiptModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3007;
  await app.listen(port, "0.0.0.0");
  console.log(`Receipt OCR Service running on port ${port}`);
}

bootstrap();
