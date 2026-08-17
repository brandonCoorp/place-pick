import { Type } from 'class-transformer';
import { IsOptional, IsNumber, Min, IsString } from 'class-validator';

export class PaginationDto<T> {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsString()
  orderBy?: keyof T | string = 'created_at';

  @IsOptional()
  @IsString()
  orderDirection?: 'ASC' | 'DESC' = 'ASC';

  query?: T;
}
