import { Expose, Exclude } from 'class-transformer';

export class OwnerResponseDto {
  @Expose()
  id: string;

  @Expose()
  phone: string;

  @Expose()
  phoneCode: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  status: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(partial: Partial<OwnerResponseDto>) {
    Object.assign(this, partial);
  }
}
