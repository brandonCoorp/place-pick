import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { OwnerResponseDto } from './dto/owner-response.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('owner')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) { }

  @Post('create')
  @Serialize(OwnerResponseDto)
  async create(@Body() createOwnerDto: CreateOwnerDto) {
    return await this.ownerService.create(createOwnerDto);
  }

  @Get('findAll')
  @Serialize(OwnerResponseDto)
  async findAll() {
    return await this.ownerService.findAll();
  }

  @Get('findOne:id')
  @Serialize(OwnerResponseDto)
  async findOne(@Param('id') id: string) {
    return await this.ownerService.findOne(id);
  }

  @Patch('update:id')
  @Serialize(OwnerResponseDto)
  async update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return await this.ownerService.update(id, updateOwnerDto);
  }
}
