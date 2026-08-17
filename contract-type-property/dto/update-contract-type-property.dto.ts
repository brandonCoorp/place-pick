import { IsUUID, IsOptional, IsString } from 'class-validator';

export class UpdateContractTypePropertyDto {
  @IsOptional()
  @IsUUID('4')
  property_id?: string;

  @IsOptional()
  @IsUUID('4')
  contract_type_id?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
