/**
 * Bank Integration Service — Controller
 *
 * Placeholder endpoint:
 *   GET /bank/status — Returns service status and integration message
 *
 * Future endpoints:
 *   POST /bank/link      — Link a bank account via Plaid
 *   GET  /bank/accounts  — List linked accounts
 *   POST /bank/sync      — Trigger transaction sync from bank
 */
import { Controller, Get } from "@nestjs/common";

@Controller("bank")
export class BankController {
  @Get("status")
  status() {
    return {
      service: "bank-integration-service",
      status: "placeholder",
      message: "Open Banking / Plaid integration will be implemented here.",
    };
  }
}
