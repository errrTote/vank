import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ClientsService } from './clients.service';
import { CreateClientDto, UpdateClientDto } from './clients.dto';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private clientsService: ClientsService) {}

  @Get(':clientId')
  getOne(@Param('clientId', ParseIntPipe) clientId: string) {
    return this.clientsService.findOne(clientId);
  }

  @Get()
  get() {
    return this.clientsService.findAll();
  }

  @Post()
  create(@Body() payload: CreateClientDto) {
    return this.clientsService.create(payload);
  }

  @Put(':clientId')
  update(
    @Param('clientId', ParseIntPipe) clientId: string,
    @Body() payload: UpdateClientDto,
  ) {
    return this.clientsService.update(clientId, payload);
  }
}
