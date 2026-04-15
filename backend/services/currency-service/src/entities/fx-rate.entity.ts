/**
 * Currency Service — FxRate Entity
 *
 * Represents a foreign exchange rate in the 'fx_rates' table.
 * Uses a composite primary key of (base, quote) currency pairs.
 *
 * Fields:
 * - base:  Base currency code (e.g., 'USD') — 3 chars
 * - quote: Quote currency code (e.g., 'EUR') — 3 chars
 * - rate:  Exchange rate (decimal 12,6 for high precision)
 * - asOf:  Timestamp when the rate was last updated
 */
import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("fx_rates")
export class FxRate {
  @PrimaryColumn({ length: 3 })
  base!: string;

  @PrimaryColumn({ length: 3 })
  quote!: string;

  @Column("decimal", { precision: 12, scale: 6 })
  rate!: number;

  @Column({ name: "as_of" })
  asOf!: Date;
}
