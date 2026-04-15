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
