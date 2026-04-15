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
