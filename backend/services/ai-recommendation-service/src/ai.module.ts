import { Module } from "@nestjs/common";
import { AiController } from "./ai.controller";
import { CategorizationService } from "./categorization.service";
import { InsightService } from "./insight.service";

@Module({
  controllers: [AiController],
  providers: [CategorizationService, InsightService],
})
export class AiModule {}
