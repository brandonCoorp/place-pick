import { Controller, Post, Delete, Param } from '@nestjs/common';
import { PropertyComfortService } from './property-comfort.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { PropertyComfortResponseDto } from './dto/response-property-comfort.dto';

@Controller('property/:propertyId/comfort')
export class PropertyComfortController {
  constructor(private readonly propertyComfortService: PropertyComfortService) {}

  @Post(':comfortId')
  @Serialize(PropertyComfortResponseDto)
  async addComfort(
    @Param('propertyId') propertyId: string,
    @Param('comfortId') comfortId: string,
  ) {
    return await this.propertyComfortService.assignSingleComfort(propertyId, comfortId);
  }

  @Delete(':comfortId')
  @Serialize(PropertyComfortResponseDto)
  async removeComfort(
    @Param('propertyId') propertyId: string,
    @Param('comfortId') comfortId: string,
  ) {
    return await this.propertyComfortService.removeSingleComfort(propertyId, comfortId);
  }
}
