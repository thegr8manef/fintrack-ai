import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("accounts")
export class Account {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id" })
  userId!: string;

  @Column()
  type!: string;

  @Column({ name: "provider_ref", nullable: true })
  providerRef?: string;

  @Column({ length: 3, default: "USD" })
  currency!: string;
}
