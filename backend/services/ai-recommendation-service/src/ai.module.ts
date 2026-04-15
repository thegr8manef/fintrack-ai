/**
 * AI Recommendation Service — Root Module
 *
 * Lightweight module with no database dependencies:
 * - AiController:           REST endpoints for categorization and insights
 * - CategorizationService:  Keyword-based merchant → category mapping
 * - InsightService:         Budget analysis and overspending alerts
 */
import { Module } from "@nestjs/common";
import { AiController } from "./ai.controller";
import { CategorizationService } from "./categorization.service";
import { InsightService } from "./insight.service";

@Module({
  controllers: [AiController],
  providers: [CategorizationService, InsightService],
})
export class AiModule {}
