import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsOptional,
  IsPositive,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoinceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly originId: number;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  readonly vendorId: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly invoiceNumber: string;

  @IsDateString()
  @ApiProperty()
  readonly invoiceDate: string;

  @IsNumber()
  @ApiProperty()
  readonly invoiceTotal: number;

  @IsNumber()
  @ApiProperty()
  readonly paymentTotal: number;

  @IsNumber()
  @ApiProperty()
  readonly creditTotal: number;

  @IsNumber()
  @ApiProperty()
  readonly bankId: number;

  @IsDateString()
  @ApiProperty()
  readonly invoiceDueDate: string;

  @IsDateString()
  @ApiProperty()
  readonly paymentDate: string;

  @IsString()
  @ApiProperty()
  readonly currency: string;
}

export class FilterInvoicesDto {
  @IsOptional()
  @IsPositive()
  @ApiProperty()
  pageSize: number;

  @ApiProperty()
  @IsOptional()
  @Min(0)
  page: number;

  @ApiProperty()
  @IsOptional()
  start_date: string;

  @ApiProperty()
  @IsOptional()
  end_date: string;

  @ApiProperty()
  @IsOptional()
  vendor_id: string;
}
