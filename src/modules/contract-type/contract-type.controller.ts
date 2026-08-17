import { Controller, Get, Param, Body, Post, Put, Delete, HttpStatus, NotFoundException } from '@nestjs/common';

import { ContractTypeService } from './contract-type.service';
import { CreateContractTypeDto } from './dto/create-contract-type.dto';
import { UpdateContractTypeDto } from './dto/update-contract-type.dto';
import { ContractTypeResponseDto } from './dto/response-contract-type.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('contract-type')
export class ContractTypeController {
  constructor(private readonly contractTypeService: ContractTypeService) {}

  @Get()
  @Serialize(ContractTypeResponseDto)
  async findAll() {
      return await this.contractTypeService.findAll();
  }

  @Get(':id')
  @Serialize(ContractTypeResponseDto)
  async findOne(@Param('id') id: string) {
      const contractType = await this.contractTypeService.findOne(id);
      return contractType;
  }

  @Post()
  @Serialize(ContractTypeResponseDto)
  async create(@Body() createContractTypeDto: CreateContractTypeDto) {
      return await this.contractTypeService.create(createContractTypeDto);
  }

  @Put(':id')
  @Serialize(ContractTypeResponseDto)
  async update(@Param('id') id: string, @Body() updateContractTypeDto: UpdateContractTypeDto) {
      return await this.contractTypeService.update(id, updateContractTypeDto);
  }

  @Delete(':id')
  @Serialize(ContractTypeResponseDto)
  async remove(@Param('id') id: string) {
      return await this.contractTypeService.remove(id);
  }
}
