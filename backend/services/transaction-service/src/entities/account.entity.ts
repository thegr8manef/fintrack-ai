/**
 * Transaction Service — Account Entity
 *
 * Represents a user's bank account in the 'accounts' table.
 * Links to external bank providers (Plaid, open banking) via providerRef.
 * Each account has a default currency for its transactions.
 *
 * Ready for bank-integration-service to populate.
 */
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
