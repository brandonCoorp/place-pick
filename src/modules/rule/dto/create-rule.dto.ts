import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRuleDto {
  @IsNotEmpty()
  @IsString()
  name!: string;

  @IsNotEmpty()
  @IsString()
  code!: string;

  @IsOptional()
  @IsString()
  description?: string;
}