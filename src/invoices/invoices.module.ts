import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';

import { Invoice } from './invoice.entity';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './services/invoices.service';
import { CronService } from './services/cron.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Invoice]),
    HttpModule,
    ScheduleModule.forRoot(),
  ],
  providers: [InvoicesService, CronService],
  exports: [TypeOrmModule],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
