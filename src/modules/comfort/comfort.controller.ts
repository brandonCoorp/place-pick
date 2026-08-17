import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { ComfortResponseDto } from './dto/comfort-response.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) { }

  @Post('create')
  @Serialize(ComfortResponseDto)
  async create(@Body() createComfortDto: CreateComfortDto) {
    return await this.comfortService.create(createComfortDto);
  }

  @Get('findAll')
  @Serialize(ComfortResponseDto)
  async findAll() {
    return await this.comfortService.findAll();
  }

  @Get('findOne/:id')
  @Serialize(ComfortResponseDto)
  async findOne(@Param('id') id: string) {
    return await this.comfortService.findOne(id);
  }

  @Patch('update/:id')
  @Serialize(ComfortResponseDto)
  async update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return await this.comfortService.update(id, updateComfortDto);
  }
}
