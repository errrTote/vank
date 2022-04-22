import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Client } from './client.entity';
import { CreateClientDto, UpdateClientDto } from './clients.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client) private clientsRepository: Repository<Client>,
  ) {}

  async findOne(id: string): Promise<Client> {
    const client = await this.clientsRepository.findOne(id);
    if (!client) throw new NotFoundException(`Client ${id} not found`);
    return client;
  }

  findAll(): Promise<Client[]> {
    return this.clientsRepository.find();
  }

  create(payload: CreateClientDto) {
    const newClient = this.clientsRepository.create(payload);
    return this.clientsRepository.save(newClient);
  }

  async update(id: string, payload: UpdateClientDto) {
    const client = await this.findOne(id);
    this.clientsRepository.merge(client, payload);
    return this.clientsRepository.save(client);
  }

  async remove(id: string): Promise<void> {
    this.clientsRepository.findOne(id);
    await this.clientsRepository.delete(id);
  }
}
