import { IsString, IsUUID, IsOptional, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsString()
  @IsOptional()
  currency?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  latitud?: number;

  @IsNumber()
  @IsOptional()
  longitud?: number;

  @IsUUID('4')
  @IsOptional()
  zoneId?: string;

  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  categoryIds: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  ownerIds?: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  comfortIds?: string[];

  @IsArray()
  @IsUUID('4', { each: true })
  @IsOptional()
  ruleIds?: string[];
}
