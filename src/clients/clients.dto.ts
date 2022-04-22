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
  readonly business_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly tax_identification_number: string;

  @IsPositive()
  @IsNotEmpty()
  @ApiProperty()
  readonly monthly_request: number;

  @IsEnum(Currencies)
  @IsNotEmpty()
  @ApiProperty()
  readonly currency: Currencies;

  @IsArray()
  @ApiProperty({ type: [Number] })
  readonly bank_information: number[];
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
