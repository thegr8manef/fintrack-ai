import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NotificationController } from "./notification.controller";
import { NotificationService } from "./notification.service";
import { NotificationTemplate } from "./entities/notification-template.entity";
import { NotificationQueue } from "./entities/notification-queue.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url:
        process.env.DATABASE_URL ||
        "postgresql://fintrack:fintrack_dev@localhost:5432/fintrack_notifications",
      entities: [NotificationTemplate, NotificationQueue],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    TypeOrmModule.forFeature([NotificationTemplate, NotificationQueue]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {}
