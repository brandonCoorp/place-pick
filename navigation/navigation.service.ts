import { Injectable } from '@nestjs/common';
import { NavigationRepository } from './repositories/navigation.repository';
import { DirectionRoutesRequestDto, ReverseGeocodeRequestDto } from './dto/reverse-geocode.request.dto';
import { ReverseGeocodeResponseDto } from './dto/reverse-geocode.response.dto';
import { response } from 'express';

@Injectable()
export class NavigationService {
  constructor(private readonly navigationRepository: NavigationRepository) {}

  async reverseGeocode(request: ReverseGeocodeRequestDto): Promise<ReverseGeocodeResponseDto> {
    const response = await this.navigationRepository.reverseGeocode(request);
    console.log('Received response from reverseGeocode:', response);
    return response;
  }

  async directionRoutes(mappoints: DirectionRoutesRequestDto[]): Promise<any> {
const response = await this.navigationRepository.directionRoutes(mappoints);
console.log('Received response from directionRoutes:', response);    
return response;
  }
}