import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoinceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly origin_id: number;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  readonly vendor_id: number;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly invoice_number: string;

  @IsDateString()
  @ApiProperty()
  readonly invoice_date: string;

  @IsNumber()
  @ApiProperty()
  readonly invoice_total: number;

  @IsNumber()
  @ApiProperty()
  readonly payment_total: number;

  @IsNumber()
  @ApiProperty()
  readonly credit_total: number;

  @IsNumber()
  @ApiProperty()
  readonly bank_id: number;

  @IsDateString()
  @ApiProperty()
  readonly invoice_due_date: string;

  @IsDateString()
  @ApiProperty()
  readonly payment_date: string;

  @IsString()
  @ApiProperty()
  readonly currency: string;
}
