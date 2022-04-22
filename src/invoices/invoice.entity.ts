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

  @Column({ type: 'int' })
  vendor_id: number;

  @Column({ type: 'varchar', length: 255 })
  invoice_number: string;

  @Column({ type: 'date' })
  invoice_date: Date;

  @Column({ type: 'int' })
  invoice_total: number;

  @Column({ type: 'int' })
  payment_total: number;

  @Column({ type: 'int' })
  credit_total: number;

  @Column({ type: 'int' })
  bank_id: number;

  @Column({ type: 'date' })
  invoice_due_date: Date;

  @Column({ type: 'date' })
  payment_date: Date;

  @Column({ type: 'varchar', length: 10 })
  currency: string;

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
