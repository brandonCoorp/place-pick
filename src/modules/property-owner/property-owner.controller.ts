import { Controller, Post, Delete, Param } from '@nestjs/common';
import { PropertyOwnerService } from './property-owner.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { PropertyOwnerResponseDto } from './dto/response-property-owner.dto';

@Controller('property/:propertyId/owner')
export class PropertyOwnerController {
  constructor(private readonly propertyOwnerService: PropertyOwnerService) {}

  @Post(':ownerId')
  @Serialize(PropertyOwnerResponseDto)
  async addOwner(
    @Param('propertyId') propertyId: string,
    @Param('ownerId') ownerId: string,
  ) {
    return await this.propertyOwnerService.assignSingleOwner(propertyId, ownerId);
  }

  @Delete(':ownerId')
  @Serialize(PropertyOwnerResponseDto)
  async removeOwner(
    @Param('propertyId') propertyId: string,
    @Param('ownerId') ownerId: string,
  ) {
    return await this.propertyOwnerService.removeSingleOwner(propertyId, ownerId);
  }
}
