import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { AiModule } from "./ai.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AiModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3005;
  await app.listen(port, "0.0.0.0");
  console.log(`AI Recommendation Service running on port ${port}`);
}

bootstrap();
