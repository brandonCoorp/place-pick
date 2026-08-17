import { Controller, Post, Delete, Param } from '@nestjs/common';
import { PropertyCategoryService } from './property-category.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { PropertyCategoryResponseDto } from './dto/response-property-category.dto';

@Controller('property/:propertyId/category')
export class PropertyCategoryController {
  constructor(private readonly propertyCategoryService: PropertyCategoryService) {}

  @Post(':categoryId')
  @Serialize(PropertyCategoryResponseDto)
  async addCategory(
    @Param('propertyId') propertyId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.propertyCategoryService.assignSingleCategory(propertyId, categoryId);
  }

  @Delete(':categoryId')
  @Serialize(PropertyCategoryResponseDto)
  async removeCategory(
    @Param('propertyId') propertyId: string,
    @Param('categoryId') categoryId: string,
  ) {
    return await this.propertyCategoryService.removeSingleCategory(propertyId, categoryId);
  }
}
