import { Exclude, Expose } from 'class-transformer';

export class PropertyComfortResponseDto {
  @Expose()
  id: string;

  @Expose()
  propertyId: string;

  @Expose()
  comfortId: string;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
