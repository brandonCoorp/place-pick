import { Expose, Exclude } from 'class-transformer';

export class ComfortResponseDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Exclude()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<ComfortResponseDto>) {
    Object.assign(this, partial);
  }
}
