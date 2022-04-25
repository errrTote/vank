import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InvoicesService } from './services/invoices.service';
import { CreateInvoinceDto, FilterInvoicesDto } from './invoinces.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('invoices')
@UseGuards(AuthGuard('jwt'))
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  get(@Query() params: FilterInvoicesDto) {
    return this.invoicesService.findBy(params);
  }
  // @Get()
  // get(
  //   @Query('page_size', ParseIntPipe) pageSize?: number,
  //   @Query('page', ParseIntPipe) page?: number,
  //   @Query('vendor_id') vendorId?: number,
  //   @Query('start_date') startDate?: string,
  //   @Query('end_date') endDate?: string,
  //   @Query('global') global?: string,
  // ) {
  //   return this.invoicesService.findBy({
  //     pageSize,
  //     page,
  //     vendorId,
  //     startDate,
  //     endDate,
  //     global,
  //   });
  // }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) id: string) {
    const invoice = await this.invoicesService.findOne(id);
    if (!invoice) throw new NotFoundException(`Invoice ${id} not found`);
    return invoice;
  }

  @Post()
  create(@Body() payload: CreateInvoinceDto) {
    return this.invoicesService.create(payload);
  }
}
