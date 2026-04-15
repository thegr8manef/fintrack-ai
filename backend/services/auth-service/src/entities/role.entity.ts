/**
 * Auth Service — Role Entity
 *
 * Defines RBAC roles in the 'roles' table.
 * Prepared for role-based access control (admin, user, moderator, etc.)
 * but not yet integrated with the authentication flow.
 *
 * Future use: Assign roles to users and check via RolesGuard.
 */
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("roles")
export class Role {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;
}
