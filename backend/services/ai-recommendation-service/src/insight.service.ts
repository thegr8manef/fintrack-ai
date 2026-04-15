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
