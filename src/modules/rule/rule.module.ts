import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Rule } from './models/rule.model';
import { RuleController } from './rule.controller';
import { RuleService } from './rule.service';
import { RuleRepository } from './repositories/rule.repository';

@Module({
  imports: [SequelizeModule.forFeature([Rule])],
  controllers: [RuleController],
  providers: [RuleService, RuleRepository],
  exports: [RuleService],
})
export class RuleModule {}
