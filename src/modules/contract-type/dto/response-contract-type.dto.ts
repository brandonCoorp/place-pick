import { Exclude, Expose } from 'class-transformer';

export class ContractTypeResponseDto {
  @Expose()
  id!: string;

  @Expose()
  name! : string;

  @Expose()
  code!: string;

  @Expose()
  description?: string;

  @Exclude()
  created_at!: Date;

  @Exclude()
  updated_at!: Date;

  constructor(partial: Partial<ContractTypeResponseDto>) {
    Object.assign(this, partial);
  }
}
