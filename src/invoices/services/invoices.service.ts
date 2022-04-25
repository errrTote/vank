import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { Observable } from 'rxjs';
import { AxiosResponse } from 'axios';

import { Invoice } from '../invoice.entity';
import { CreateInvoinceDto, FilterInvoicesDto } from '../invoinces.dto';

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

  getPaginationData(total: number, pageSize: number, page: number) {
    const totalPages: number = Math.ceil(total / pageSize);
    const nextPage: number = page === totalPages ? 0 : page + 1;
    const prevPage: number = page > 1 ? page - 1 : 0;
    const lastPage: number = totalPages;
    const firstPage = 1;
    const from: number = page > 1 ? pageSize * (page - 1) + 1 : 1;
    const to: number =
      page > 1 ? (page === lastPage ? total : pageSize * page) : pageSize;
    return {
      totalPages,
      firstPage,
      prevPage,
      nextPage,
      lastPage,
      total,
      pageSize,
      from,
      to,
      currentPage: page,
    };
  }

  async findBy(params?: FilterInvoicesDto) {
    if (params) {
      const { pageSize, page, vendor_id, start_date, end_date } = params;
      const skip: number = pageSize * (page - 1);
      const query = { take: pageSize, skip, where: {} };
      vendor_id ? (query.where['vendorId'] = vendor_id) : null;
      start_date && end_date
        ? (query.where['invoiceDate'] = Between(start_date, end_date))
        : null;
      const [result, total] = await this.invoicesRepository.findAndCount(query);
      const pagination = this.getPaginationData(total, pageSize, page);
      return {
        result,
        pagination,
      };
    }

    return this.invoicesRepository.find();
  }

  findOne(id: string): Promise<Invoice> {
    return this.invoicesRepository.findOne(id);
  }

  findByOriginId(id: number): Promise<Invoice> {
    return this.invoicesRepository.findOne({ where: { originId: id } });
  }

  create(payload: CreateInvoinceDto) {
    const newUser = this.invoicesRepository.create(payload);
    return this.invoicesRepository.save(newUser);
  }

  async tryToCreate(payload: CreateInvoinceDto) {
    const { originId } = payload;
    const exist = await this.findByOriginId(originId);
    if (exist) return;
    await this.create(payload);
  }
}
