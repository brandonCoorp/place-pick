import { Expose, Type } from 'class-transformer';
import { CategoryResponseDto } from '../../category/dto/category-response.dto';
import { ZoneResponseDto } from '../../zone/dto/zone-response.dto';
import { ComfortResponseDto } from '../../comfort/dto/comfort-response.dto';
import { RuleResponseDto } from '../../rule/dto/rule-response.dto';
import { OwnerResponseDto } from '../../owner/dto/owner-response.dto';
import { ImageResponseDto } from '../../image/dto/image-response.dto';

export class PropertyResponseDto {
  @Expose()
  id: string;

  @Expose()
  zoneId: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  currency: string;

  @Expose()
  address: string;

  @Expose()
  status: string;

  @Expose()
  latitud: number;

  @Expose()
  longitud: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => ZoneResponseDto)
  zone: ZoneResponseDto;

  @Expose()
  @Type(() => CategoryResponseDto)
  categories: CategoryResponseDto[];

  @Expose()
  @Type(() => ComfortResponseDto)
  comforts: ComfortResponseDto[];

  @Expose()
  @Type(() => RuleResponseDto)
  rules: RuleResponseDto[];

  @Expose()
  @Type(() => OwnerResponseDto)
  owners: OwnerResponseDto[];

  @Expose()
  @Type(() => ImageResponseDto)
  images: ImageResponseDto[];

  constructor(partial: Partial<PropertyResponseDto>) {
    Object.assign(this, partial);
  }
}
