import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rule } from '../models/rule.model';
import { CreateRuleDto } from '../dto/create-rule.dto';
import { UpdateRuleDto } from '../dto/update-rule.dto';

@Injectable()
export class RuleRepository {
  constructor(
    @InjectModel(Rule)
    private readonly ruleModel: typeof Rule,
  ) {}

  async create(dto: CreateRuleDto): Promise<Rule> {
    return this.ruleModel.create(dto);
  }

  async findAll(): Promise<Rule[]> {
    return this.ruleModel.findAll();
  }

  async findById(id: string): Promise<Rule | null> {
    return this.ruleModel.findByPk(id);
  }

  async update(id: string, dto: UpdateRuleDto): Promise<Rule> {
    const rule = await this.ruleModel.findByPk(id);
    if (!rule) {
      throw new Error('Rule not found');
    }

    return rule.update(dto);
  }

  async delete(id: string): Promise<void> {
    await this.ruleModel.destroy({
      where: { id },
    });
  }
}