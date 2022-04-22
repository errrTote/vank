import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoinceDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly vendor_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly invoice_number: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly invoice_date: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly invoice_total: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly payment_total: number;

  @IsNumber()
  @ApiProperty()
  readonly credit_total: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly bank_id: number;

  @IsDateString()
  @ApiProperty()
  readonly invoice_due_date: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  readonly payment_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly currency: string;
}
