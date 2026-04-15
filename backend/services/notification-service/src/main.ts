import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { NotificationModule } from "./notification.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    NotificationModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3006;
  await app.listen(port, "0.0.0.0");
  console.log(`Notification Service running on port ${port}`);
}

bootstrap();
