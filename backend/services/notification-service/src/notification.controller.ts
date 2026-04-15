/**
 * Notification Service — Controller
 *
 * REST endpoints for notification management:
 *   POST /notifications         — Enqueue a notification with userId, channel, and payload
 *   GET  /notifications/pending — Fetch up to 50 pending notifications for delivery
 */
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
