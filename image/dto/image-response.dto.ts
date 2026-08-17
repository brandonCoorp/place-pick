import { Expose } from 'class-transformer';

export class ImageResponseDto {
  @Expose()
  id: string;

  @Expose()
  propertyId: string;

  @Expose()
  url: string;

  @Expose()
  priority: number;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<ImageResponseDto>) {
    Object.assign(this, partial);
  }
}
