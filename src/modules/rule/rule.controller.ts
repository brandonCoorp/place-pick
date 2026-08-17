import { Controller, Get, Param, Body, Post, Put, Delete, HttpStatus, NotFoundException } from '@nestjs/common';

import { RuleService } from './rule.service';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';
import { RuleResponseDto } from './dto/response-rule.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('rule')
export class RuleController {
    constructor(private readonly ruleService: RuleService) { }

    @Get('findAll')
    @Serialize(RuleResponseDto)
    async findAll() {
        return await this.ruleService.findAll();
    }

    @Get('findOne/:id')
    @Serialize(RuleResponseDto)
    async findOne(@Param('id') id: string) {
        const rule = await this.ruleService.findOne(id);
        return rule;
    }

    @Post('create')
    @Serialize(RuleResponseDto)
    async create(@Body() createRuleDto: CreateRuleDto) {
        return await this.ruleService.create(createRuleDto);
    }

    @Put('update/:id')
    @Serialize(RuleResponseDto)
    async update(@Param('id') id: string, @Body() updateRuleDto: UpdateRuleDto) {
        return await this.ruleService.update(id, updateRuleDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.ruleService.remove(id);
    }
}