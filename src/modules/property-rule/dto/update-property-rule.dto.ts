import { IsUUID, IsOptional, IsString } from 'class-validator';

export class UpdatePropertyRuleDto {
  @IsOptional()
  @IsUUID('4')
  propertyId?: string;

  @IsOptional()
  @IsUUID('4')
  ruleId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}