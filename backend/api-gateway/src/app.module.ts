/**
 * API Gateway — Root Module
 *
 * Configures the gateway with:
 * - ThrottlerModule: Rate limiting at 100 requests per 60 seconds per client
 *   to protect downstream services from abuse.
 * - ProxyModule: Handles routing all /api/v1/* requests to the correct
 *   backend microservice (auth, users, transactions, etc.).
 * - HealthController: Exposes GET /api/v1/health for load balancer checks.
 */
import { Module } from "@nestjs/common";
import { ThrottlerModule, ThrottlerGuard } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { HealthController } from "./health.controller";
import { ProxyModule } from "./proxy/proxy.module";

@Module({
  imports: [ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]), ProxyModule],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
