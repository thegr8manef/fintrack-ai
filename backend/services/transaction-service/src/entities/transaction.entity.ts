/**
 * Transaction Service — Transaction Entity
 *
 * Represents a financial transaction in the 'transactions' table.
 *
 * Fields:
 * - userId:     Owner of this transaction (indexed for fast lookups)
 * - accountId:  Optional linked bank account
 * - amount:     Transaction value (decimal 12,2 for precision)
 * - currency:   3-letter ISO currency code (e.g., 'USD', 'EUR')
 * - baseAmount: Amount converted to user's default currency (for analytics)
 * - category:   Expense category (food, transport, entertainment, etc.)
 * - merchant:   Merchant name (optional — used by AI categorization)
 * - txnType:    'income' or 'expense' (default: 'expense')
 * - occurredAt: When the transaction happened (for timeline ordering)
 */
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
