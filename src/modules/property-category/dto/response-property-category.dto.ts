import { Exclude, Expose } from 'class-transformer';

export class PropertyCategoryResponseDto {
  @Expose()
  id: string;

  @Expose()
  propertyId: string;

  @Expose()
  categoryId: string;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
