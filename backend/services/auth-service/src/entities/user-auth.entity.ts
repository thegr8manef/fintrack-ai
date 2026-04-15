import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
} from "typeorm";

@Entity("users_auth")
export class UserAuth {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  @Index()
  email!: string;

  @Column({ name: "password_hash" })
  passwordHash!: string;

  @Column({ name: "oauth_provider", nullable: true })
  oauthProvider?: string;

  @Column({ name: "mfa_enabled", default: false })
  mfaEnabled!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;
}
