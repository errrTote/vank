import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from './users.entity';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id);
    if (!user) throw new NotFoundException(`User ${id} not found`);
    return user;
  }

  findBy(keys: any): Promise<User> {
    return this.usersRepository.findOne({ where: keys });
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(payload: CreateUserDto) {
    const exist = await this.findBy({ email: payload.email });
    if (exist)
      throw new NotFoundException(`User ${payload.email} already exist`);
    const newUser = this.usersRepository.create(payload);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    return this.usersRepository.save(newUser);
  }

  async update(id: string, payload: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, payload);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    this.usersRepository.findOne(id);
    await this.usersRepository.delete(id);
  }
}
