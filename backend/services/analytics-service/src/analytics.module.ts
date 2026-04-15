/**
 * Analytics Service — Root Module
 *
 * Wires together the analytics layer:
 * - TypeORM: Connects to PostgreSQL (fintrack_analytics) for report job tracking
 * - Entity: ReportJob (scheduled aggregation jobs)
 * - AnalyticsService: Queries Elasticsearch for spend aggregations
 *
 * Note: Kafka consumer for populating ES from TransactionCreated events
 * is not yet implemented.
 */
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
