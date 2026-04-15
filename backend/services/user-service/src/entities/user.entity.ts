import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "full_name" })
  fullName!: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ default: "en" })
  locale!: string;

  @Column({ default: "UTC" })
  timezone!: string;

  @Column({ name: "default_currency", default: "USD" })
  defaultCurrency!: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
