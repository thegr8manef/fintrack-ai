import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { TransactionModule } from "./transaction.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    TransactionModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3003;
  await app.listen(port, "0.0.0.0");
  console.log(`Transaction Service running on port ${port}`);
}

bootstrap();
