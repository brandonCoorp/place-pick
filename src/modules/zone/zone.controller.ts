import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { ZoneResponseDto } from './dto/zone-response.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('zone')
export class ZoneController {
  constructor(private readonly zoneService: ZoneService) { }

  @Post('create')
  @Serialize(ZoneResponseDto)
  create(@Body() createZoneDto: CreateZoneDto) {
    return this.zoneService.create(createZoneDto);
  }

  @Get('findAll')
  @Serialize(ZoneResponseDto)
  findAll() {
    return this.zoneService.findAll();
  }

  @Get('findOne/:id')
  @Serialize(ZoneResponseDto)
  findOne(@Param('id') id: string) {
    return this.zoneService.findOne(id);
  }

  @Patch('update/:id')
  @Serialize(ZoneResponseDto)
  update(@Param('id') id: string, @Body() updateZoneDto: UpdateZoneDto) {
    return this.zoneService.update(id, updateZoneDto);
  }
}
