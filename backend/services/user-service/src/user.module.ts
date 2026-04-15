import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./entities/user.entity";
import { UserPreference } from "./entities/user-preference.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url:
        process.env.DATABASE_URL ||
        "postgresql://fintrack:fintrack_dev@localhost:5432/fintrack_users",
      entities: [User, UserPreference],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    TypeOrmModule.forFeature([User, UserPreference]),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
