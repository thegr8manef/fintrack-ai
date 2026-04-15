import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AnalyticsModule } from "./analytics.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AnalyticsModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3004;
  await app.listen(port, "0.0.0.0");
  console.log(`Analytics Service running on port ${port}`);
}

bootstrap();
