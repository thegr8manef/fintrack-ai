/**
 * API Gateway — Proxy Module
 *
 * Encapsulates the proxy routing layer:
 * - ProxyController: Catches all wildcard routes and forwards requests
 * - ProxyService: Maintains the service route map (prefix → URL)
 */
import { Module } from "@nestjs/common";
import { ProxyController } from "./proxy.controller";
import { ProxyService } from "./proxy.service";

@Module({
  controllers: [ProxyController],
  providers: [ProxyService],
})
export class ProxyModule {}
