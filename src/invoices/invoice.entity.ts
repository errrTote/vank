import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  origin_id: number;

  @Column({ type: 'int' })
  vendor_id: number;

  @Column({ type: 'varchar', length: 255 })
  invoice_number: string;

  @Column({ type: 'date', nullable: true })
  invoice_date: string;

  @Column({ type: 'decimal' })
  invoice_total: number;

  @Column({ type: 'decimal' })
  payment_total: number;

  @Column({ type: 'decimal' })
  credit_total: number;

  @Column({ type: 'int' })
  bank_id: number;

  @Column({ type: 'date', nullable: true })
  invoice_due_date: string;

  @Column({ type: 'date', nullable: true })
  payment_date: string;

  @Column({ type: 'varchar', length: 10 })
  currency: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_at: string;
}
