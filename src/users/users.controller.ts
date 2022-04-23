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

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@ApiTags('users')
@Controller('users')
export class usersController {
  constructor(private usersService: UsersService) {}

  @Get(':userId')
  getOne(@Param('userId', ParseIntPipe) userId: string) {
    return this.usersService.findOne(userId);
  }

  @Get()
  get() {
    return this.usersService.findAll();
  }

  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.usersService.create(payload);
  }

  @Put(':userId')
  update(
    @Param('userId', ParseIntPipe) userId: string,
    @Body() payload: UpdateUserDto,
  ) {
    return this.usersService.update(userId, payload);
  }
}
