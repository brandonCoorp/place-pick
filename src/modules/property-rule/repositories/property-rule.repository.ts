import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PropertyRule } from '../models/property-rule.model';
import { Transaction } from 'sequelize';
import { CreatePropertyRuleDto } from '../dto/create-property-rule.dto';
import { UpdatePropertyRuleDto } from '../dto/update-property-rule.dto';

@Injectable()
export class PropertyRuleRepository {
  constructor(
    @InjectModel(PropertyRule)
    private readonly propertyRuleModel: typeof PropertyRule,
  ) {}

  async create(dto: CreatePropertyRuleDto, transaction?: Transaction): Promise<PropertyRule> {
    return this.propertyRuleModel.create(dto, { transaction });
  }

  async findAll(): Promise<PropertyRule[]> {
    return this.propertyRuleModel.findAll();
  }

  async findById(id: string): Promise<PropertyRule | null> {
    return this.propertyRuleModel.findByPk(id);
  }

  async findOneByPropertyAndRule(propertyId: string, ruleId: string): Promise<PropertyRule | null> {
    return this.propertyRuleModel.findOne({
      where: { propertyId, ruleId },
    });
  }

  async updateStatus(id: string, status: string, transaction?: Transaction): Promise<void> {
    await this.propertyRuleModel.update({ status }, {
      where: { id },
      transaction,
    });
  }

  async update(id: string, dto: UpdatePropertyRuleDto): Promise<PropertyRule> {
    const propertyRule = await this.propertyRuleModel.findByPk(id);
    if (!propertyRule) {
      throw new Error('Property rule not found');
    }

    return propertyRule.update(dto);
  }

  async delete(id: string): Promise<void> {
    await this.propertyRuleModel.destroy({
      where: { id },
    });
  }

  async bulkCreate(data: any[], transaction?: Transaction): Promise<void> {
    await this.propertyRuleModel.bulkCreate(data, { transaction });
  }

  async deleteByPropertyId(propertyId: string, transaction?: Transaction): Promise<void> {
    await this.propertyRuleModel.destroy({
      where: { propertyId },
      transaction,
    });
  }
}