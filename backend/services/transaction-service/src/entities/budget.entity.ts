/**
 * Transaction Service — Budget Entity
 *
 * Represents a spending budget in the 'budgets' table.
 * Users set a limit amount per category and period.
 *
 * Fields:
 * - period:      Budget period ('monthly', 'weekly', 'yearly')
 * - category:    Expense category this budget applies to
 * - limitAmount: Maximum allowed spend (decimal 12,2)
 * - currency:    Currency code for the limit
 *
 * Used by AI-service to generate overspending alerts.
 */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("budgets")
export class Budget {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "user_id" })
  userId!: string;

  @Column()
  period!: string;

  @Column()
  category!: string;

  @Column("decimal", { name: "limit_amount", precision: 12, scale: 2 })
  limitAmount!: number;

  @Column({ length: 3, default: "USD" })
  currency!: string;
}
