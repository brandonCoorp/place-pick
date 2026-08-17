import { Controller, Get, Post, Body, Patch, Param, Query, UsePipes } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { PropertyResponseDto } from './dto/property-response.dto';
import { PaginationQueryTransformPipe } from 'src/common/pipe/PaginationQueryTransformPipe.pipe';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) { }

  @Post('create')
  @Serialize(PropertyResponseDto)
  async create(@Body() createPropertyDto: CreatePropertyDto) {
    return await this.propertyService.create(createPropertyDto);
  }

  @Get('findAll')
  @UsePipes(new PaginationQueryTransformPipe())
  async findAll(@Query() query: any) {
    return await this.propertyService.findAll(query);
  }

  @Get('findOne/:id')
  @Serialize(PropertyResponseDto)
  async findOne(@Param('id') id: string) {
    return await this.propertyService.findOne(id);
  }

  @Patch('update/:id')
  @Serialize(PropertyResponseDto)
  async update(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) {
    return await this.propertyService.update(id, updatePropertyDto);
  }
}
