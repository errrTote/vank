import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

import { InvoicesService } from './invoices.service';
import { CreateInvoinceDto } from '../invoinces.dto';

@Injectable()
export class CronService {
  constructor(private invoicesService: InvoicesService) {}

  private readonly logger = new Logger(CronService.name);

  createNewInvoice(row) {
    const arrayFields = row.split(',');
    if (!arrayFields) return null;
    const invoice: CreateInvoinceDto = {
      origin_id: arrayFields[0] ? Number(arrayFields[0]) : 0,
      vendor_id: arrayFields[1] ? Number(arrayFields[1]) : 0,
      invoice_number: arrayFields[2] ? arrayFields[2] : '',
      invoice_date: arrayFields[3] ? arrayFields[3] : null,
      invoice_total: arrayFields[4] ? Number(arrayFields[4]) : 0,
      payment_total: arrayFields[5] ? Number(arrayFields[5]) : 0,
      credit_total: arrayFields[6] ? Number(arrayFields[6]) : 0,
      bank_id: arrayFields[7] ? Number(arrayFields[7]) : 0,
      invoice_due_date: arrayFields[8] ? arrayFields[8] : null,
      payment_date: arrayFields[9] ? arrayFields[9] : null,
      currency: arrayFields[10] ? arrayFields[10] : '',
    };
    return invoice;
  }

  @Cron('0 0 9 * * *', { timeZone: 'America/Santiago' })
  async InvoicesCron() {
    this.logger.debug(
      'InvoicesCron called every day at 9:00AM America/Santiago',
    );
    await this.invoicesService.getNews().subscribe((data) => {
      if (!data && !data.data) {
        this.logger.debug('No new invoices');
        return;
      }
      const rows = data.data.split(/\n/);
      rows.shift();
      rows.map(async (row: string) => {
        const invoice = this.createNewInvoice(row);
        try {
          await this.invoicesService.tryToCreate(invoice);
        } catch (error) {
          this.logger.debug(error);
        }
      });
    });
  }
}
