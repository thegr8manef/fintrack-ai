import { Injectable } from "@nestjs/common";
import { Client } from "@elastic/elasticsearch";

@Injectable()
export class AnalyticsService {
  private readonly esClient: Client;

  constructor() {
    this.esClient = new Client({
      node: process.env.ELASTICSEARCH_URL || "http://localhost:9200",
    });
  }

  async getSummary(userId: string, range: string) {
    // Query Elasticsearch for aggregated spend analytics
    try {
      const result = await this.esClient.search({
        index: "spend_analytics",
        body: {
          query: {
            bool: {
              must: [
                { term: { user_id: userId } },
                { range: { date_bucket: { gte: `now-1${range.charAt(0)}` } } },
              ],
            },
          },
          aggs: {
            by_category: {
              terms: { field: "category" },
              aggs: {
                total_amount: { sum: { field: "amount" } },
              },
            },
          },
        },
      });
      return result;
    } catch {
      // ES might not be populated yet — return empty stub
      return { categories: [], totalSpend: 0, range };
    }
  }
}
