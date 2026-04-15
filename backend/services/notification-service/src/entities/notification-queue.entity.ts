import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("notification_queue")
export class NotificationQueue {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id" })
  userId!: string;

  @Column()
  channel!: string;

  @Column({ type: "jsonb" })
  payload!: Record<string, unknown>;

  @Column({ default: "pending" })
  status!: string;

  @Column({ name: "retry_count", default: 0 })
  retryCount!: number;

  @Column({ name: "scheduled_at" })
  scheduledAt!: Date;
}
