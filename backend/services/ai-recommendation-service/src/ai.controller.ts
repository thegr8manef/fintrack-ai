import { Controller, Post, Body, Get, Query } from "@nestjs/common";
import { CategorizationService } from "./categorization.service";
import { InsightService } from "./insight.service";

@Controller("insights")
export class AiController {
  constructor(
    private readonly categorizationService: CategorizationService,
    private readonly insightService: InsightService,
  ) {}

  @Post("categorize")
  categorize(@Body() body: { merchant: string }) {
    return this.categorizationService.categorize(body.merchant);
  }

  @Post("generate")
  generateInsights(
    @Body()
    body: {
      userId: string;
      spendData: { category: string; amount: number; budget: number }[];
    },
  ) {
    return this.insightService.generateInsights(body.userId, body.spendData);
  }
}
