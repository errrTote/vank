import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Currencies } from '../common/currencies';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  business_name: string;

  @Column({ type: 'varchar', length: 50 })
  tax_identification_number: string;

  @Column({ type: 'int' })
  monthly_request: number;

  @Column({ type: 'enum', enum: Currencies, default: Currencies.clp })
  currency: Currencies;

  @Column({ type: 'decimal', array: true })
  bank_information: number[];

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: Date;
}
