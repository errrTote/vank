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
      originId: arrayFields[0] ? Number(arrayFields[0]) : 0,
      vendorId: arrayFields[1] ? Number(arrayFields[1]) : 0,
      invoiceNumber: arrayFields[2] ? arrayFields[2] : '',
      invoiceDate: arrayFields[3] ? arrayFields[3] : null,
      invoiceTotal: arrayFields[4] ? Number(arrayFields[4]) : 0,
      paymentTotal: arrayFields[5] ? Number(arrayFields[5]) : 0,
      creditTotal: arrayFields[6] ? Number(arrayFields[6]) : 0,
      bankId: arrayFields[7] ? Number(arrayFields[7]) : 0,
      invoiceDueDate: arrayFields[8] ? arrayFields[8] : null,
      paymentDate: arrayFields[9] ? arrayFields[9] : null,
      currency: arrayFields[10] ? arrayFields[10] : '',
    };
    return invoice;
  }

  @Cron('0 40 17 * * *', { timeZone: 'America/Argentina/Buenos_Aires' })
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
