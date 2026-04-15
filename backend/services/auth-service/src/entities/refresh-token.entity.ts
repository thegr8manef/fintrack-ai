/**
 * Auth Service — RefreshToken Entity
 *
 * Stores hashed refresh tokens in the 'refresh_tokens' table.
 * Each token is SHA-256 hashed before storage for security.
 * Supports token rotation: old tokens are revoked (revokedAt set)
 * when a new pair is issued via the refresh endpoint.
 *
 * Fields:
 * - tokenHash:  SHA-256 hash of the raw refresh token
 * - expiresAt:  Token expiration date (7 days from creation)
 * - revokedAt:  Set when token is rotated or explicitly revoked
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { UserAuth } from "./user-auth.entity";

@Entity("refresh_tokens")
export class RefreshToken {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => UserAuth)
  @JoinColumn({ name: "user_id" })
  user!: UserAuth;

  @Column({ name: "user_id" })
  userId!: string;

  @Column({ name: "token_hash" })
  tokenHash!: string;

  @Column({ name: "expires_at" })
  expiresAt!: Date;

  @Column({ name: "revoked_at", nullable: true })
  revokedAt?: Date;
}
