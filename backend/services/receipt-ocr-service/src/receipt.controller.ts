import { Controller, Post, Get, Body, Param, Query } from "@nestjs/common";
import { ReceiptService } from "./receipt.service";

@Controller("receipts")
export class ReceiptController {
  constructor(private readonly receiptService: ReceiptService) {}

  @Post("upload")
  upload(@Body() body: { userId: string; imageUrl: string }) {
    return this.receiptService.upload(body.userId, body.imageUrl);
  }

  @Get()
  findByUser(@Query("userId") userId: string) {
    return this.receiptService.findByUser(userId);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.receiptService.findOne(id);
  }
}
