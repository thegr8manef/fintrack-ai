/**
 * User Service — User Entity
 *
 * Represents a user's profile in the 'users' table.
 * Stores personal information separate from authentication credentials.
 *
 * Fields:
 * - fullName:        Display name
 * - phone:           Optional phone number
 * - locale:          Preferred language (default: 'en')
 * - timezone:        User's timezone (default: 'UTC')
 * - defaultCurrency: Preferred currency code (default: 'USD')
 *
 * Note: This table is separate from users_auth in auth-service.
 */
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
