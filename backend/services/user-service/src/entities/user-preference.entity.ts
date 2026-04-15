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
