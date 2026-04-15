import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Transaction } from "./entities/transaction.entity";
import { Budget } from "./entities/budget.entity";
import { KafkaProducerService } from "./kafka-producer.service";

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly txnRepo: Repository<Transaction>,
    @InjectRepository(Budget)
    private readonly budgetRepo: Repository<Budget>,
    private readonly kafka: KafkaProducerService,
  ) {}

  async create(userId: string, data: Partial<Transaction>) {
    const txn = this.txnRepo.create({ ...data, userId });
    const saved = await this.txnRepo.save(txn);

    await this.kafka.emit("transactions", {
      eventType: "TransactionCreated",
      payload: {
        transactionId: saved.id,
        userId,
        amount: saved.amount,
        currency: saved.currency,
        category: saved.category,
      },
    });

    return saved;
  }

  async findByUser(userId: string, page = 1, limit = 20) {
    return this.txnRepo.find({
      where: { userId },
      order: { occurredAt: "DESC" },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string) {
    const txn = await this.txnRepo.findOne({ where: { id } });
    if (!txn) throw new NotFoundException("Transaction not found");
    return txn;
  }

  async delete(id: string) {
    const result = await this.txnRepo.delete(id);
    if (result.affected === 0)
      throw new NotFoundException("Transaction not found");
  }

  async getBudgets(userId: string) {
    return this.budgetRepo.find({ where: { userId } });
  }

  async createBudget(userId: string, data: Partial<Budget>) {
    const budget = this.budgetRepo.create({ ...data, userId });
    return this.budgetRepo.save(budget);
  }
}
