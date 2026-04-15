import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { CurrencyModule } from "./currency.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    CurrencyModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3008;
  await app.listen(port, "0.0.0.0");
  console.log(`Currency Service running on port ${port}`);
}

bootstrap();
