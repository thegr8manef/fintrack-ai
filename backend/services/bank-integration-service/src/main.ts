/**
 * Bank Integration Service — Entry Point (Port 3009)
 *
 * Placeholder service for open banking / Plaid integration.
 * Will provide account linking, balance fetching, and automatic
 * transaction import from connected bank accounts.
 *
 * Endpoints:
 *   GET /bank/status — Returns placeholder status message
 *
 * Status: NOT IMPLEMENTED — Only a status endpoint exists.
 */
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { BankModule } from "./bank.module";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    BankModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT || 3009;
  await app.listen(port, "0.0.0.0");
  console.log(`Bank Integration Service running on port ${port}`);
}

bootstrap();
