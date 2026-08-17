
import { Exclude, Expose } from 'class-transformer';

export class LocationDto {
  address!: string;
  city!: string;
  country!: string;
  postalCode?: string;
  region?: string;
}



export class ReverseGeocodeResponseDto {
  @Expose()
  latitude!: string;

  @Expose()
  longitude! : string;

  @Expose()
  location!: LocationDto;

  @Exclude()
  formattedAddress!: string;

  @Exclude()
  updatedAt?: Date;

  constructor(partial: Partial<ReverseGeocodeResponseDto>) {
    Object.assign(this, partial);
  }
}