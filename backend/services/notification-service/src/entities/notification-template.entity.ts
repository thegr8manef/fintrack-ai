/**
 * Notification Service — NotificationTemplate Entity
 *
 * Stores reusable message templates in the 'notification_templates' table.
 * Each template has a unique key and channel, allowing different template
 * bodies for different delivery methods.
 *
 * Fields:
 * - channel:     Target channel (push, email, SMS)
 * - templateKey: Unique identifier (e.g., 'budget_alert', 'welcome_email')
 * - body:        Template text (may contain placeholders for variable substitution)
 */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("notification_templates")
export class NotificationTemplate {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  channel!: string;

  @Column({ name: "template_key", unique: true })
  templateKey!: string;

  @Column("text")
  body!: string;
}
