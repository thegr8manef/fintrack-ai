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
