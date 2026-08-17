import { IsUUID, IsOptional, IsString } from 'class-validator';

export class UpdatePropertyCategoryDto {
  @IsOptional()
  @IsUUID('4')
  propertyId?: string;

  @IsOptional()
  @IsUUID('4')
  categoryId?: string;

  @IsOptional()
  @IsString()
  status?: string;
}
