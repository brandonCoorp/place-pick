import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { DirectionRoutesRequestDto, ReverseGeocodeRequestDto } from '../dto/reverse-geocode.request.dto';
import { ReverseGeocodeResponseDto, LocationDto } from '../dto/reverse-geocode.response.dto';

@Injectable()
export class NavigationRepository {
  private readonly mapboxApiUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
  private readonly mapboxAccessToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.mapboxAccessToken = this.configService.get<string>('MAPBOX_ACCESS_TOKEN')!;
    if (!this.mapboxAccessToken) {
      throw new Error('MAPBOX_ACCESS_TOKEN is not defined in environment variables');
    }
  }

  async reverseGeocode(
    request: ReverseGeocodeRequestDto,
  ): Promise<ReverseGeocodeResponseDto> {
    try {
      const { longitude, latitude } = request;

      const url = `${this.mapboxApiUrl}/${longitude},${latitude}.json`;
      const response = await firstValueFrom(
        this.httpService.get(url, {
          params: {
            access_token: this.mapboxAccessToken,
          },
        }),
      );

      const data = response.data;

      if (!data.features || data.features.length === 0) {
        throw new HttpException(
          'No location found for the provided coordinates',
          HttpStatus.NOT_FOUND,
        );
      }

      const feature = data.features[0];
      const location = this.parseMapboxResponse(feature);
      console.log('Parsed location from Mapbox response:', location);
      return {
        latitude,
        longitude,
        location,
        formattedAddress:  this.buildFormattedAddress(location), // feature.place_name || this.buildFormattedAddress(location),
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(
        'Failed to fetch location data from Mapbox',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private parseMapboxResponse(feature: any): LocationDto {
    console.log('Parsing Mapbox feature:', feature);
    const location: LocationDto = {
      address: '',
      city: '',
      country: '',
    };

    // Parse the Mapbox feature object
    if (feature.properties && (feature.address || feature.text)) {
      location.address = feature.address || feature.text;
    }

    // Extract city, region, and country from context array
    const context = feature.context || [];

    for (const item of context) {
      if (item.id.startsWith('place.')) {
        location.city = item.text;
      } else if (item.id.startsWith('region.')) {
        location.region = item.text;
      } else if (item.id.startsWith('country.')) {
        location.country = item.text;
      } else if (item.id.startsWith('postcode.')) {
        location.postalCode = item.text;
      }
    }

    // Fallback if city is not found
    if (!location.city && feature.text) {
      location.city = feature.text;
    }

    return location;
  }

 private buildFormattedAddress(location: LocationDto): string {
  const rawParts = [
    location.address,
    location.city,
    location.region,
    location.country,
  ];

  const seen = new Set<string>();
  const finalParts: string[] = [];

  for (const part of rawParts) {
    if (!part) continue;

    const cleaned = part.trim();
    const normalized = cleaned.toLowerCase();

    if (!seen.has(normalized)) {
      seen.add(normalized);
      finalParts.push(cleaned);
    }
  }

  return finalParts.join(', ');
}

async directionRoutes(mappoints: DirectionRoutesRequestDto[]): Promise<any> {
       if (mappoints.length < 2) {
            throw new Error('At least 2 mappoints are required');
        }

        const coordinates = mappoints
            .map(wp => `${wp.lng},${wp.lat}`)
            .join(';');

        const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${this.mapboxAccessToken}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log('Mapbox directions response:', JSON.stringify(data, null, 2));


            return null;
        } catch (error) {
            console.error('Error fetching directions:', error);
            return null;
        }
}
}
