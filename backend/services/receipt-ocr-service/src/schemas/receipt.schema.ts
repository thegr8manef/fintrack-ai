/**
 * Receipt OCR Service — Receipt Schema (MongoDB/Mongoose)
 *
 * Document schema for receipt storage:
 * - userId:        Owner of the receipt
 * - imageUrl:      URL to the uploaded receipt image (S3 in production)
 * - merchant:      Extracted merchant name (from OCR)
 * - total:         Extracted total amount
 * - currency:      Currency code (default: 'USD')
 * - tax:           Extracted tax amount
 * - items:         Array of line items { name, quantity, price }
 * - purchasedAt:   Date of purchase
 * - ocrConfidence: OCR extraction confidence score (0–1)
 *
 * Auto-generates createdAt/updatedAt via { timestamps: true }
 */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Receipt extends Document {
  @Prop({ required: true })
  userId!: string;

  @Prop()
  imageUrl!: string;

  @Prop()
  merchant?: string;

  @Prop()
  total?: number;

  @Prop({ default: "USD" })
  currency!: string;

  @Prop()
  tax?: number;

  @Prop({ type: [{ name: String, quantity: Number, price: Number }] })
  items!: { name: string; quantity: number; price: number }[];

  @Prop()
  purchasedAt?: Date;

  @Prop({ default: 0 })
  ocrConfidence!: number;
}

export const ReceiptSchema = SchemaFactory.createForClass(Receipt);
