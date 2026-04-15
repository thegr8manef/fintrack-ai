/**
 * Currency Service — Controller
 *
 * REST endpoints for FX rate management:
 *   GET /currency/rates?base=USD — Returns all FX rates for the given base currency
 *   GET /currency/convert?amount=100&from=USD&to=EUR
 *       — Converts an amount, returns { from, to, amount, converted }
 */
import { Controller, Get, Query } from "@nestjs/common";
import { CurrencyService } from "./currency.service";

@Controller("currency")
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get("rates")
  getRates(@Query("base") base = "USD") {
    return this.currencyService.getRates(base);
  }

  @Get("convert")
  async convert(
    @Query("amount") amount: string,
    @Query("from") from: string,
    @Query("to") to: string,
  ) {
    const result = await this.currencyService.convert(
      parseFloat(amount),
      from,
      to,
    );
    return { from, to, amount: parseFloat(amount), converted: result };
  }
}
