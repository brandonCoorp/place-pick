import { Expose } from "class-transformer";

export class ZoneResponseDto {
  @Expose()
  id: string;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  latitud: number;

  @Expose()
  longitud: number;

  @Expose()
  radiusInMeters: number;

  constructor(partial: Partial<ZoneResponseDto>) {
    Object.assign(this, partial);
  }
}
