import { IsUUID, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePropertyRuleDto {
  @IsNotEmpty()
  @IsUUID('4')
  propertyId!: string;

  @IsNotEmpty()
  @IsUUID('4')
  ruleId!: string;

  @IsOptional()
  @IsString()
  status?: string;
}