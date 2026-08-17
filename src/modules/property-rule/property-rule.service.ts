import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyRuleRepository } from './repositories/property-rule.repository';
import { Transaction } from 'sequelize';
import { CreatePropertyRuleDto } from './dto/create-property-rule.dto';
import { UpdatePropertyRuleDto } from './dto/update-property-rule.dto';

@Injectable()
export class PropertyRuleService {
  constructor(
    private readonly propertyRuleRepository: PropertyRuleRepository,
  ) {}

  async create(dto: CreatePropertyRuleDto) {
    return this.propertyRuleRepository.create(dto);
  }

  async findAll() {
    return this.propertyRuleRepository.findAll();
  }

  async findOne(id: string) {
    const propertyRule = await this.propertyRuleRepository.findById(id);

    if (!propertyRule) {
      throw new NotFoundException('property rule not found');
    }

    return propertyRule;
  }

  async update(id: string, dto: UpdatePropertyRuleDto) {
   return await this.propertyRuleRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.propertyRuleRepository.delete(id);
  }

  async assignRules(propertyId: string, ruleIds: string[], transaction?: Transaction) {
    const data = ruleIds.map((ruleId) => ({
      propertyId,
      ruleId,
    }));
    await this.propertyRuleRepository.bulkCreate(data, transaction);
  }

  async assignSingleRule(propertyId: string, ruleId: string, transaction?: Transaction) {
    const existing = await this.propertyRuleRepository.findOneByPropertyAndRule(propertyId, ruleId);

    if (existing) {
      if (existing.status !== 'active') {
        await this.propertyRuleRepository.updateStatus(existing.id, 'active', transaction);
      }
      existing.status = 'active';
      return existing;
    }

    return await this.propertyRuleRepository.create({
      propertyId,
      ruleId,
    }, transaction);
  }

  async removeSingleRule(propertyId: string, ruleId: string, transaction?: Transaction) {
    const existing = await this.propertyRuleRepository.findOneByPropertyAndRule(propertyId, ruleId);

    if (!existing) {
      throw new NotFoundException('Relationship not found');
    }

    await this.propertyRuleRepository.updateStatus(existing.id, 'inactive', transaction);
    existing.status = 'inactive';
    return existing;
  }

  async removeAllByPropertyId(propertyId: string, transaction?: Transaction) {
    await this.propertyRuleRepository.deleteByPropertyId(propertyId, transaction);
  }
}