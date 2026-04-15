import { Entity, PrimaryGeneratedColumn, Column, Index } from "typeorm";

@Entity("transactions")
export class Transaction {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id" })
  @Index()
  userId!: string;

  @Column({ name: "account_id", nullable: true })
  accountId?: string;

  @Column("decimal", { precision: 12, scale: 2 })
  amount!: number;

  @Column({ length: 3 })
  currency!: string;

  @Column("decimal", {
    name: "base_amount",
    precision: 12,
    scale: 2,
    nullable: true,
  })
  baseAmount?: number;

  @Column()
  category!: string;

  @Column({ nullable: true })
  merchant?: string;

  @Column({ name: "txn_type", default: "expense" })
  txnType!: string;

  @Column({ name: "occurred_at" })
  occurredAt!: Date;
}
