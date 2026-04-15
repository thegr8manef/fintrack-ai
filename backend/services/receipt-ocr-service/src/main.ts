import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { ReceiptModule } from "./receipt.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    ReceiptModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3007;
  await app.listen(port, "0.0.0.0");
  console.log(`Receipt OCR Service running on port ${port}`);
}

bootstrap();
