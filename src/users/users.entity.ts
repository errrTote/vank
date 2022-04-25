import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Currencies } from '../common/currencies';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'int', default: 1 })
  role: string;

  @Exclude()
  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ name: 'business_name', type: 'varchar', length: 50 })
  businessName: string;

  @Column({ name: 'tax_identification_number', type: 'varchar', length: 50 })
  taxIdentificationNumber: string;

  @Column({ name: 'monthly_request', type: 'int' })
  monthlyRequest: number;

  @Column({ type: 'enum', enum: Currencies, default: Currencies.clp })
  currency: Currencies;

  @Column({ name: 'bank_information', type: 'decimal' })
  bankInformation: number;
  // @Column({ name: 'bank_information', type: 'decimal', array: true })
  // bankInformation: number[];

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
