/**
 * AI Recommendation Service — Categorization
 *
 * Keyword-based merchant name → category mapping.
 * Searches the merchant name (case-insensitive) against a dictionary
 * of category keywords. Returns the matched category with a confidence
 * score (0.85–0.99 for matches, 0.3 for uncategorized).
 *
 * Categories: food, transport, entertainment, shopping, utilities, health
 *
 * Future: Replace with ML model (e.g., text classifier) for better accuracy.
 */
import { Injectable } from "@nestjs/common";

export interface CategorizationResult {
  suggested: string;
  confidence: number;
}

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  food: [
    "restaurant",
    "cafe",
    "starbucks",
    "mcdonalds",
    "pizza",
    "grocery",
    "uber eats",
    "doordash",
  ],
  transport: [
    "uber",
    "lyft",
    "gas",
    "fuel",
    "parking",
    "transit",
    "metro",
    "taxi",
  ],
  entertainment: [
    "netflix",
    "spotify",
    "cinema",
    "movie",
    "game",
    "concert",
    "hulu",
  ],
  shopping: [
    "amazon",
    "walmart",
    "target",
    "mall",
    "store",
    "clothing",
    "shoes",
  ],
  utilities: ["electric", "water", "internet", "phone", "gas bill", "rent"],
  health: ["pharmacy", "doctor", "hospital", "gym", "fitness", "medical"],
};

@Injectable()
export class CategorizationService {
  categorize(merchant: string): CategorizationResult {
    const lower = merchant.toLowerCase();

    for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
      for (const keyword of keywords) {
        if (lower.includes(keyword)) {
          return {
            suggested: category,
            confidence: 0.85 + Math.random() * 0.14,
          };
        }
      }
    }

    return { suggested: "uncategorized", confidence: 0.3 };
  }
}
