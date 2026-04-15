import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CurrencyController } from "./currency.controller";
import { CurrencyService } from "./currency.service";
import { FxRate } from "./entities/fx-rate.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url:
        process.env.DATABASE_URL ||
        "postgresql://fintrack:fintrack_dev@localhost:5432/fintrack_currency",
      entities: [FxRate],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    TypeOrmModule.forFeature([FxRate]),
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class CurrencyModule {}
