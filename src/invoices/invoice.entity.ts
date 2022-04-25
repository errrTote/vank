import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose } from 'class-transformer';

@Entity({ name: 'invoices' })
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'origin_id', type: 'int', default: 0 })
  originId: number;

  @Column({ name: 'vendor_id', type: 'int' })
  vendorId: number;

  @Column({ name: 'invoice_number', type: 'varchar', length: 255 })
  invoiceNumber: string;

  @Column({ name: 'invoice_date', type: 'date', nullable: true })
  invoiceDate: string;

  @Column({ name: 'invoice_total', type: 'decimal' })
  invoiceTotal: number;

  @Expose()
  get invoiceTotalProcesed(): number {
    return this.invoiceTotal * 100;
  }

  @Column({ name: 'payment_total', type: 'decimal' })
  paymentTotal: number;

  @Column({ name: 'credit_total', type: 'decimal' })
  creditTotal: number;

  @Column({ name: 'bank_id', type: 'int' })
  bankId: number;

  @Column({ name: 'invoice_due_date', type: 'date', nullable: true })
  invoiceDueDate: string;

  @Column({ name: 'payment_date', type: 'date', nullable: true })
  paymentDate: string;

  @Column({ type: 'varchar', length: 10 })
  currency: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;
}
