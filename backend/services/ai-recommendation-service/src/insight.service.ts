/**
 * AI Recommendation Service — Insight Generation
 *
 * Analyzes user spend data against budget limits to generate actionable insights.
 *
 * Logic:
 * - Over 100% budget → overspending alert (high if >150%, medium otherwise)
 * - Over 80% budget  → warning (low severity)
 * - Under 80%        → no alert generated
 *
 * Returns an array of Insight objects with type, message, category, and severity.
 * Consumed by the mobile app to display AI recommendations on the Analytics screen.
 */
import { Injectable } from "@nestjs/common";

export interface Insight {
  type: "overspending" | "saving_opportunity" | "forecast";
  message: string;
  category?: string;
  severity: "low" | "medium" | "high";
}

@Injectable()
export class InsightService {
  generateInsights(
    userId: string,
    spendData: { category: string; amount: number; budget: number }[],
  ): Insight[] {
    const insights: Insight[] = [];

    for (const item of spendData) {
      const ratio = item.amount / item.budget;

      if (ratio > 1) {
        insights.push({
          type: "overspending",
          message: `You've exceeded your ${item.category} budget by ${((ratio - 1) * 100).toFixed(0)}%.`,
          category: item.category,
          severity: ratio > 1.5 ? "high" : "medium",
        });
      } else if (ratio > 0.8) {
        insights.push({
          type: "overspending",
          message: `You've used ${(ratio * 100).toFixed(0)}% of your ${item.category} budget.`,
          category: item.category,
          severity: "low",
        });
      }
    }

    return insights;
  }
}
