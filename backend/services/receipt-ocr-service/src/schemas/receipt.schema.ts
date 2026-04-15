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
