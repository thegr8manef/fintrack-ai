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
