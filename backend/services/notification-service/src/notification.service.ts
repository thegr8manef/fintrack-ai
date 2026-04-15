import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationQueue } from "./entities/notification-queue.entity";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationQueue)
    private readonly queueRepo: Repository<NotificationQueue>,
  ) {}

  async enqueue(
    userId: string,
    channel: string,
    payload: Record<string, unknown>,
  ) {
    const notification = this.queueRepo.create({
      userId,
      channel,
      payload,
      status: "pending",
      scheduledAt: new Date(),
    });
    return this.queueRepo.save(notification);
  }

  async getPending(limit = 50) {
    return this.queueRepo.find({
      where: { status: "pending" },
      order: { scheduledAt: "ASC" },
      take: limit,
    });
  }

  async markSent(id: string) {
    await this.queueRepo.update(id, { status: "sent" });
  }

  async markFailed(id: string) {
    await this.queueRepo.increment({ id }, "retryCount", 1);
    await this.queueRepo.update(id, { status: "failed" });
  }
}
