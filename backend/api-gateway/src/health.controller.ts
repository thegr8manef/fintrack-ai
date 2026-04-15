/**
 * API Gateway — Health Check Controller
 *
 * Provides a lightweight health endpoint at GET /api/v1/health.
 * Used by Kubernetes liveness/readiness probes and load balancers
 * to verify the gateway is running and responsive.
 *
 * Returns: { status: "ok", service: "api-gateway", timestamp: ISO string }
 */
import { Controller, Get } from "@nestjs/common";

@Controller("health")
export class HealthController {
  @Get()
  check() {
    return {
      status: "ok",
      service: "api-gateway",
      timestamp: new Date().toISOString(),
    };
  }
}
