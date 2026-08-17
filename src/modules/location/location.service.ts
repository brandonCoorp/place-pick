import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocationService {
  constructor(private readonly configService: ConfigService) {}

  async search(q: string) {
    if (!q) {
      throw new HttpException('Query parameter "q" is required', HttpStatus.BAD_REQUEST);
    }
    const token = this.configService.get<string>('MAPBOX_ACCESS_TOKEN');
    if (!token) {
      throw new HttpException('Mapbox token is not configured on the server', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(q)}.json?access_token=${token}&limit=1`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    } catch (error) {
      throw new HttpException('Failed to fetch from Mapbox', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
