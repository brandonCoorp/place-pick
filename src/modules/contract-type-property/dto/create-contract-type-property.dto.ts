import { IsUUID, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContractTypePropertyDto {
  @IsNotEmpty()
  @IsUUID('4')
  property_id!: string;

  @IsNotEmpty()
  @IsUUID('4')
  contract_type_id!: string;

  @IsOptional()
  @IsString()
  status?: string;
}
