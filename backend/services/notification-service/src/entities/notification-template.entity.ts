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
