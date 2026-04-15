/**
 * Currency Service — Business Logic
 *
 * Two-tier FX rate lookup with Redis caching:
 * - getRate():  Checks Redis cache first (key: fx:<base>:<quote>)
 *               Falls back to PostgreSQL on cache miss, then caches for 3600s
 * - getRates(): Returns all rates for a base currency from DB
 * - convert():  Calculates amount * rate, returns null if rate not found
 *
 * Rate data must be seeded manually or via an external FX rate API.
 */
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FxRate } from "./entities/fx-rate.entity";
import Redis from "ioredis";

@Injectable()
export class CurrencyService {
  private readonly redis: Redis;

  constructor(
    @InjectRepository(FxRate)
    private readonly fxRepo: Repository<FxRate>,
  ) {
    this.redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");
  }

  async getRate(base: string, quote: string): Promise<number | null> {
    // Check Redis cache first
    const cacheKey = `fx:${base}:${quote}`;
    const cached = await this.redis.get(cacheKey);
    if (cached) return parseFloat(cached);

    // Fall back to DB
    const rate = await this.fxRepo.findOne({ where: { base, quote } });
    if (rate) {
      await this.redis.setex(cacheKey, 3600, rate.rate.toString());
      return rate.rate;
    }

    return null;
  }

  async getRates(base: string) {
    return this.fxRepo.find({ where: { base } });
  }

  async convert(
    amount: number,
    from: string,
    to: string,
  ): Promise<number | null> {
    if (from === to) return amount;
    const rate = await this.getRate(from, to);
    return rate ? amount * rate : null;
  }
}
