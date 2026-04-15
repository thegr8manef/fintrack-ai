/**
 * Transaction Service — Root Module
 *
 * Wires together the transaction management layer:
 * - TypeORM: Connects to PostgreSQL (fintrack_transactions) with auto-sync in dev
 * - Entities: Transaction (financial records), Account (bank accounts), Budget (spending limits)
 * - KafkaProducerService: Emits events to Kafka for downstream consumers
 * - TransactionController + TransactionService: CRUD + budget management
 */
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TransactionController } from "./transaction.controller";
import { TransactionService } from "./transaction.service";
import { Transaction } from "./entities/transaction.entity";
import { Account } from "./entities/account.entity";
import { Budget } from "./entities/budget.entity";
import { KafkaProducerService } from "./kafka-producer.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url:
        process.env.DATABASE_URL ||
        "postgresql://fintrack:fintrack_dev@localhost:5432/fintrack_transactions",
      entities: [Transaction, Account, Budget],
      synchronize: process.env.NODE_ENV !== "production",
    }),
    TypeOrmModule.forFeature([Transaction, Account, Budget]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, KafkaProducerService],
})
export class TransactionModule {}
