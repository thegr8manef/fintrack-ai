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
