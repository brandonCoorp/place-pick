import { IsNumber, IsLatitude, IsLongitude, IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ReverseGeocodeRequestDto {
  @IsNumber()
  @IsLatitude()
  latitude!: string;

  @IsNumber()
  @IsLongitude()
  longitude!: string;
}

export class DirectionRoutesRequestDto {
 
  @IsNumber()
  @IsLatitude()
  lat!: string; 
  
  @IsNumber()
  @IsLongitude()
  lng!: string;  

}

export class DirectionRoutesWrapperDto {

  @IsArray()
  @Type(() => DirectionRoutesRequestDto)
  mappoints!: DirectionRoutesRequestDto[];
}