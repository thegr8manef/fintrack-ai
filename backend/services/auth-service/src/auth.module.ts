/**
 * Auth Service — Root Module
 *
 * Wires together the authentication layer:
 * - TypeORM: Connects to PostgreSQL (fintrack_auth) with auto-sync in dev
 * - Entities: UserAuth (credentials), RefreshToken (token rotation), Role (RBAC)
 * - AuthController: REST endpoints for register/login/refresh
 * - AuthService: Business logic for credential validation and token issuance
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UserAuth } from "./entities/user-auth.entity";
import { RefreshToken } from "./entities/refresh-token.entity";
import { Role } from "./entities/role.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url:
        process.env.DATABASE_URL ||
        "postgresql://fintrack:fintrack_dev@localhost:5432/fintrack_auth",
      entities: [UserAuth, RefreshToken, Role],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    TypeOrmModule.forFeature([UserAuth, RefreshToken, Role]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
