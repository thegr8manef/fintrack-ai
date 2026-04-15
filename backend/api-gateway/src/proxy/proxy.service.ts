import { Injectable } from "@nestjs/common";

interface ServiceRoute {
  name: string;
  url: string;
  prefix: string;
}

@Injectable()
export class ProxyService {
  private readonly routes: ServiceRoute[] = [
    {
      name: "auth-service",
      url: process.env.AUTH_SERVICE_URL || "http://localhost:3001",
      prefix: "/auth",
    },
    {
      name: "user-service",
      url: process.env.USER_SERVICE_URL || "http://localhost:3002",
      prefix: "/users",
    },
    {
      name: "transaction-service",
      url: process.env.TRANSACTION_SERVICE_URL || "http://localhost:3003",
      prefix: "/transactions",
    },
    {
      name: "analytics-service",
      url: process.env.ANALYTICS_SERVICE_URL || "http://localhost:3004",
      prefix: "/analytics",
    },
    {
      name: "ai-service",
      url: process.env.AI_SERVICE_URL || "http://localhost:3005",
      prefix: "/insights",
    },
    {
      name: "notification-service",
      url: process.env.NOTIFICATION_SERVICE_URL || "http://localhost:3006",
      prefix: "/notifications",
    },
    {
      name: "receipt-service",
      url: process.env.RECEIPT_SERVICE_URL || "http://localhost:3007",
      prefix: "/receipts",
    },
    {
      name: "currency-service",
      url: process.env.CURRENCY_SERVICE_URL || "http://localhost:3008",
      prefix: "/currency",
    },
  ];

  getServiceUrl(prefix: string): string | null {
    const route = this.routes.find((r) => prefix.startsWith(r.prefix));
    return route ? route.url : null;
  }

  getRoutes(): ServiceRoute[] {
    return this.routes;
  }
}
