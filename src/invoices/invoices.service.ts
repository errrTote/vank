import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Invoice } from './invoice.entity';
import { CreateInvoinceDto } from './invoinces.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoicesRepository: Repository<Invoice>,
  ) {}

  findAll(): Promise<Invoice[]> {
    return this.invoicesRepository.find();
  }

  findOne(id: string): Promise<Invoice> {
    return this.invoicesRepository.findOne(id);
  }

  create(payload: CreateInvoinceDto) {
    const newClient = this.invoicesRepository.create(payload);
    return this.invoicesRepository.save(newClient);
  }
}
