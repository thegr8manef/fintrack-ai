/**
 * AI Recommendation Service — Controller
 *
 * REST endpoints for AI-powered financial insights:
 *   POST /insights/categorize  — Input: { merchant: "Starbucks" }
 *                                Output: { suggested: "food", confidence: 0.85-0.99 }
 *   POST /insights/generate    — Input: { userId, spendData: [{ category, amount, budget }] }
 *                                Output: Array of insights with severity levels
 */
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
