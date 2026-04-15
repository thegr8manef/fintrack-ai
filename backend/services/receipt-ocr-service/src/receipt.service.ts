/**
 * Receipt OCR Service — Business Logic
 *
 * Manages receipt documents in MongoDB:
 * - upload():     Creates a receipt document (OCR placeholder — no actual processing)
 * - findByUser(): Lists all receipts for a user, sorted by createdAt DESC
 * - findOne():    Fetches a single receipt by MongoDB ObjectId
 *
 * TODO: Integrate AWS Textract or Google Vision API for actual OCR processing.
 * Currently sets ocrConfidence to 0 and items to empty array.
 */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Receipt } from "./schemas/receipt.schema";

@Injectable()
export class ReceiptService {
  constructor(
    @InjectModel(Receipt.name) private readonly receiptModel: Model<Receipt>,
  ) {}

  async upload(userId: string, imageUrl: string) {
    // In production, process with OCR (e.g., AWS Textract) and extract data
    const receipt = new this.receiptModel({
      userId,
      imageUrl,
      ocrConfidence: 0,
      items: [],
    });
    return receipt.save();
  }

  async findByUser(userId: string) {
    return this.receiptModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    return this.receiptModel.findById(id).exec();
  }
}
