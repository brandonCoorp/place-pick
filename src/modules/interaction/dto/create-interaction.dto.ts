import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateInteractionDto {
  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsNotEmpty()
  action: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  view?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
