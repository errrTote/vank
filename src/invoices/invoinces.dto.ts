import { IsOptional, IsPositive, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
