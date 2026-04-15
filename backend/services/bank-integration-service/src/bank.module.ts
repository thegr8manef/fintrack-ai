/**
 * Bank Integration Service — Root Module
 *
 * Minimal module with only BankController.
 * No database or external provider connections yet.
 * Will eventually integrate Plaid SDK or open banking APIs.
 */
import { Module } from "@nestjs/common";
import { BankController } from "./bank.controller";

@Module({
  controllers: [BankController],
})
export class BankModule {}
