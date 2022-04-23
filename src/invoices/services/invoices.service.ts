import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { Invoice } from '../invoice.entity';
import { CreateInvoinceDto } from '../invoinces.dto';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice) private invoicesRepository: Repository<Invoice>,
    private httpService: HttpService,
  ) {}

  getNews(): Observable<AxiosResponse<string>> {
    return this.httpService.get(
      'https://gist.github.com/rogelio-meza-t/f70a484ec20b8ea43c67f95a58597c29/raw',
    );
  }

  findAll(): Promise<Invoice[]> {
    return this.invoicesRepository.find();
  }

  findOne(id: string): Promise<Invoice> {
    return this.invoicesRepository.findOne(id);
  }

  findByOriginId(id: number): Promise<Invoice> {
    return this.invoicesRepository.findOne({ where: { origin_id: id } });
  }

  create(payload: CreateInvoinceDto) {
    const newClient = this.invoicesRepository.create(payload);
    return this.invoicesRepository.save(newClient);
  }

  async tryToCreate(payload: CreateInvoinceDto) {
    const { origin_id } = payload;
    const exist = await this.findByOriginId(origin_id);
    if (exist) return;
    await this.create(payload);
  }
}
