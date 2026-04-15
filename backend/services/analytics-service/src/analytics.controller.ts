import { Controller, Get, Query } from "@nestjs/common";
import { AnalyticsService } from "./analytics.service";

@Controller("analytics")
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get("summary")
  getSummary(
    @Query("userId") userId: string,
    @Query("range") range = "monthly",
  ) {
    return this.analyticsService.getSummary(userId, range);
  }
}
