/**
 * Transaction Service — Controller
 *
 * REST endpoints for financial transaction management:
 *   POST   /transactions           — Create new transaction (userId from body, JWT in production)
 *   GET    /transactions?userId=&page=&limit=  — Paginated user transactions
 *   GET    /transactions/:id        — Get single transaction by ID
 *   DELETE /transactions/:id        — Delete a transaction
 *   GET    /budgets/:userId         — List all budgets for a user
 *   POST   /budgets                 — Create a new budget (category + limit)
 */
import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from "@nestjs/common";
import { TransactionService } from "./transaction.service";

@Controller("transactions")
export class TransactionController {
  constructor(private readonly txnService: TransactionService) {}

  @Post()
  create(@Body() body: any) {
    const userId = body.userId; // In production, extract from JWT
    return this.txnService.create(userId, body);
  }

  @Get()
  findAll(
    @Query("userId") userId: string,
    @Query("page") page = "1",
    @Query("limit") limit = "20",
  ) {
    return this.txnService.findByUser(userId, parseInt(page), parseInt(limit));
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.txnService.findOne(id);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.txnService.delete(id);
  }

  @Get("budgets/:userId")
  getBudgets(@Param("userId") userId: string) {
    return this.txnService.getBudgets(userId);
  }

  @Post("budgets")
  createBudget(@Body() body: any) {
    return this.txnService.createBudget(body.userId, body);
  }
}
