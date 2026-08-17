import { Exclude, Expose } from 'class-transformer';

export class CategoryResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name! : string;

  @Expose()
  code!: string;

  @Expose()
  description!: string;

  @Exclude()
  createdAt!: Date;

  @Exclude()
  updatedAt!: Date;

  constructor(partial: Partial<CategoryResponseDto>) {
    Object.assign(this, partial);
  }
}
