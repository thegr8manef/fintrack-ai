import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { UserModule } from "./user.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    UserModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3002;
  await app.listen(port, "0.0.0.0");
  console.log(`User Service running on port ${port}`);
}

bootstrap();
