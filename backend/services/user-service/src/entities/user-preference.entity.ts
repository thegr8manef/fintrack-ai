/**
 * User Service — UserPreference Entity
 *
 * Stores per-user preferences in the 'preferences' table.
 * Uses userId as the primary key (one row per user, upsert pattern).
 *
 * Fields:
 * - budgetAlertEnabled: Whether to send budget threshold alerts (default: true)
 * - insightFrequency:   How often AI insights are generated (daily/weekly/monthly)
 * - channels:           JSON object of notification channel toggles
 *                       e.g. { push: true, email: true, sms: false }
 */
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("preferences")
export class UserPreference {
  @PrimaryColumn({ name: "user_id" })
  userId!: string;

  @Column({ name: "budget_alert_enabled", default: true })
  budgetAlertEnabled!: boolean;

  @Column({ name: "insight_frequency", default: "weekly" })
  insightFrequency!: string;

  @Column({ type: "jsonb", nullable: true })
  channels?: Record<string, boolean>;
}
