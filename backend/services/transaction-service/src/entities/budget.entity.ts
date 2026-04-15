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
