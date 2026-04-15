/**
 * Analytics Service — ReportJob Entity
 *
 * Tracks scheduled analytics aggregation jobs in the 'report_jobs' table.
 * Each job represents a periodic aggregation task for a user.
 *
 * Fields:
 * - userId:      Target user for the report
 * - period:      Aggregation period (daily, weekly, monthly)
 * - status:      Job status (pending, running, completed, failed)
 * - generatedAt: When the report was last generated
 */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("report_jobs")
export class ReportJob {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id" })
  userId!: string;

  @Column()
  period!: string;

  @Column({ default: "pending" })
  status!: string;

  @Column({ name: "generated_at", nullable: true })
  generatedAt?: Date;
}
