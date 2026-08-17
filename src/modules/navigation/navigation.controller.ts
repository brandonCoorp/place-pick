import { Controller, Post, Body } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import { DirectionRoutesRequestDto, DirectionRoutesWrapperDto, ReverseGeocodeRequestDto } from './dto/reverse-geocode.request.dto';
import { ReverseGeocodeResponseDto } from './dto/reverse-geocode.response.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Post('reverse-geocode')
  @Serialize(ReverseGeocodeResponseDto)
  async reverseGeocode(
    @Body() request: ReverseGeocodeRequestDto,
  ): Promise<ReverseGeocodeResponseDto> {
    return await this.navigationService.reverseGeocode(request);
  }

 @Post('direction-routes')
  async directionRoutes( @Body() request: DirectionRoutesWrapperDto,): Promise<any> {
    // Implementación futura para obtener rutas entre dos puntos
   return this.navigationService.directionRoutes(
    request.mappoints
  );
    
  }
}
