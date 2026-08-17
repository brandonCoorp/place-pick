import { IsOptional, IsString, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { FindPropertyDto } from './find-property.dto';

export class FindPropertyQueryDto extends FindPropertyDto {
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
  orderBy?: string = 'created_at';

  @IsOptional()
  @IsString()
  orderDirection?: 'ASC' | 'DESC' = 'DESC';
}
