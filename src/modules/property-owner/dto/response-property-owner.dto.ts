import { Exclude, Expose } from 'class-transformer';

export class PropertyOwnerResponseDto {
  @Expose()
  id: string;

  @Expose()
  propertyId: string;

  @Expose()
  ownerId: string;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}
