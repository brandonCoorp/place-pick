import { Controller, Get, Param, Body, Post, Put, Delete, HttpStatus, NotFoundException } from '@nestjs/common';

import { ContractTypePropertyService } from './contract-type-property.service';
import { CreateContractTypePropertyDto } from './dto/create-contract-type-property.dto';
import { UpdateContractTypePropertyDto } from './dto/update-contract-type-property.dto';
import { ContractTypePropertyResponseDto } from './dto/response-contract-type-property.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('contract-type-property')
export class ContractTypePropertyController {
  constructor(private readonly contractTypePropertyService: ContractTypePropertyService) {}

  @Get()
  @Serialize(ContractTypePropertyResponseDto)
  async findAll() {
      return await this.contractTypePropertyService.findAll();
  }

  @Get(':id')
  @Serialize(ContractTypePropertyResponseDto)
  async findOne(@Param('id') id: string) {
      return await this.contractTypePropertyService.findOne(id);
  }

  @Post()
  @Serialize(ContractTypePropertyResponseDto)
  async create(@Body() createContractTypePropertyDto: CreateContractTypePropertyDto) {
      return await this.contractTypePropertyService.create(createContractTypePropertyDto);
  }

  @Put(':id')
  @Serialize(ContractTypePropertyResponseDto)
  async update(@Param('id') id: string, @Body() updateContractTypePropertyDto: UpdateContractTypePropertyDto) {
      return await this.contractTypePropertyService.update(id, updateContractTypePropertyDto);
  }

  @Delete(':id')
  @Serialize(ContractTypePropertyResponseDto)
  async remove(@Param('id') id: string) {
      return await this.contractTypePropertyService.remove(id);
  }
}
