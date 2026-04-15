import { Module } from "@nestjs/common";
import { BankController } from "./bank.controller";

@Module({
  controllers: [BankController],
})
export class BankModule {}
