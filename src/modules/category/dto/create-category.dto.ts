import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @IsNotEmpty()
  @Length(2, 100)
  @IsString()
  name!: string;

  @IsNotEmpty()
  @Length(2, 100)
  @Transform(({ value }) => value.toUpperCase())  
  @IsString()
  code!: string;

  @IsOptional()
  @IsString()
  description?: string;
}
