import { IsUUID, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePropertyCategoryDto {
  @IsNotEmpty()
  @IsUUID('4')
  propertyId!: string;

  @IsNotEmpty()
  @IsUUID('4')
  categoryId!: string;

  @IsOptional()
  @IsString()
  status?: string;
}
