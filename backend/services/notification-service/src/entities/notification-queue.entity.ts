/**
 * Notification Service — NotificationQueue Entity
 *
 * Represents a queued notification in the 'notification_queue' table.
 *
 * Fields:
 * - userId:      Target user for the notification
 * - channel:     Delivery channel ('push', 'email', 'sms', 'in-app')
 * - payload:     JSON payload with notification data
 * - status:      'pending' | 'sent' | 'failed'
 * - retryCount:  Number of delivery attempts (incremented on failure)
 * - scheduledAt: When the notification should be delivered
 */
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
