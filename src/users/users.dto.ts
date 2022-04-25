import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsEnum,
  IsEmail,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { Currencies } from '../common/currencies';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly businessName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly taxIdentificationNumber: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly monthlyRequest: number;

  @IsEnum(Currencies)
  @IsNotEmpty()
  @ApiProperty()
  readonly currency: Currencies;

  @IsPositive()
  @ApiProperty()
  readonly bankInformation: number;

  // @IsArray()
  // @ApiProperty({ type: [Number] })
  // readonly bankInformation: number[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
