import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Invoice } from './invoice.entity';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  providers: [InvoicesService],
  exports: [TypeOrmModule],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
