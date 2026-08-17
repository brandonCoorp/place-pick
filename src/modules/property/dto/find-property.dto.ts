import { IsString, IsUUID, IsOptional, IsArray, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class FindPropertyDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  categoryIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  comfortIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  ruleIds?: string[];

  @IsOptional()
  @IsArray()
  @IsUUID('4', { each: true })
  zoneIds?: string[];

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Type(() => Number)
  maxPrice?: number;

  @IsOptional()
  @IsString()
  status?: string;
}
