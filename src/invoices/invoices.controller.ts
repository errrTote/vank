import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { InvoicesService } from './services/invoices.service';
import { CreateInvoinceDto } from './invoinces.dto';
import { AuthGuard } from '@nestjs/passport';
@ApiTags('invoices')
@UseGuards(AuthGuard('jwt'))
@Controller('invoices')
export class InvoicesController {
  constructor(private invoicesService: InvoicesService) {}

  @Get()
  get() {
    return this.invoicesService.findAll();
  }

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
