import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AnalyticsController } from "./analytics.controller";
import { AnalyticsService } from "./analytics.service";
import { ReportJob } from "./entities/report-job.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url:
        process.env.DATABASE_URL ||
        "postgresql://fintrack:fintrack_dev@localhost:5432/fintrack_analytics",
      entities: [ReportJob],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    TypeOrmModule.forFeature([ReportJob]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
