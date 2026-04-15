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
