import { Controller, Post, Body, Get } from "@nestjs/common";
import { NotificationService } from "./notification.service";

@Controller("notifications")
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  enqueue(
    @Body()
    body: {
      userId: string;
      channel: string;
      payload: Record<string, unknown>;
    },
  ) {
    return this.notificationService.enqueue(
      body.userId,
      body.channel,
      body.payload,
    );
  }

  @Get("pending")
  getPending() {
    return this.notificationService.getPending();
  }
}
