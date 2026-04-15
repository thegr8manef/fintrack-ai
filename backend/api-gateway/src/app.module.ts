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
