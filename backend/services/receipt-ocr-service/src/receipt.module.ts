/**
 * Receipt OCR Service — Root Module
 *
 * Wires the receipt management layer:
 * - Mongoose: Connects to MongoDB (fintrack_receipts) for document storage
 * - Schema: Receipt (image, merchant, items, OCR confidence)
 * - ReceiptController + ReceiptService: Upload and query receipts
 */
import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReceiptController } from "./receipt.controller";
import { ReceiptService } from "./receipt.service";
import { Receipt, ReceiptSchema } from "./schemas/receipt.schema";

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URL || "mongodb://localhost:27017/fintrack_receipts",
    ),
    MongooseModule.forFeature([{ name: Receipt.name, schema: ReceiptSchema }]),
  ],
  controllers: [ReceiptController],
  providers: [ReceiptService],
})
export class ReceiptModule {}
