import { Exclude, Expose } from 'class-transformer';

export class ContractTypePropertyResponseDto {
  @Expose()
  id!: string;

  @Expose()
  property_id!: string;

  @Expose()
  contract_type_id!: string;

  @Expose()
  status?: string;

  @Exclude()
  created_at!: Date;

  @Exclude()
  updated_at!: Date;

  constructor(partial: Partial<ContractTypePropertyResponseDto>) {
    Object.assign(this, partial);
  }
}
