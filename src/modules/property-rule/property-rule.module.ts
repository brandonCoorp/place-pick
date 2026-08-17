import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertyRule } from './models/property-rule.model';
import { PropertyRuleController } from './property-rule.controller';
import { PropertyRuleService } from './property-rule.service';
import { PropertyRuleRepository } from './repositories/property-rule.repository';

@Module({
  imports: [SequelizeModule.forFeature([PropertyRule])],
  controllers: [PropertyRuleController],
  providers: [PropertyRuleService, PropertyRuleRepository],
  exports: [PropertyRuleService],
})
export class PropertyRuleModule {}