import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsEnum,
  IsArray,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

import { Currencies } from '../common/currencies';

export class CreateClientDto {
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

  @IsArray()
  @ApiProperty({ type: [Number] })
  readonly bankInformation: number[];
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
