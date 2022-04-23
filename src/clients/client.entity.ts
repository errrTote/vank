import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Currencies } from '../common/currencies';

@Entity({ name: 'clients' })
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'business_name', type: 'varchar', length: 50 })
  businessName: string;

  @Column({ name: 'tax_identification_number', type: 'varchar', length: 50 })
  taxIdentificationNumber: string;

  @Column({ name: 'monthly_request', type: 'int' })
  monthlyRequest: number;

  @Column({ type: 'enum', enum: Currencies, default: Currencies.clp })
  currency: Currencies;

  @Column({ name: 'bank_information', type: 'decimal', array: true })
  bankInformation: number[];

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
