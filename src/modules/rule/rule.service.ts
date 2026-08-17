import { Injectable, NotFoundException } from '@nestjs/common';
import { RuleRepository } from './repositories/rule.repository';
import { CreateRuleDto } from './dto/create-rule.dto';
import { UpdateRuleDto } from './dto/update-rule.dto';

@Injectable()
export class RuleService {
  constructor(
    private readonly ruleRepository: RuleRepository,
  ) {}

  async create(dto: CreateRuleDto) {
    return this.ruleRepository.create(dto);
  }

  async findAll() {
    return this.ruleRepository.findAll();
  }

  async findOne(id: string) {
    const rule = await this.ruleRepository.findById(id);

    if (!rule) {
      throw new NotFoundException('rule not found');
    }

    return rule;
  }

  async update(id: string, dto: UpdateRuleDto) {
   return await this.ruleRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.ruleRepository.delete(id);
  }
}