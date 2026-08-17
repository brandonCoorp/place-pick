import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractType } from './models/contract-type.model';
import { ContractTypeController } from './contract-type.controller';
import { ContractTypeService } from './contract-type.service';
import { ContractTypeRepository } from './repositories/contract-type.repository';

@Module({
  imports: [SequelizeModule.forFeature([ContractType])],
  controllers: [ContractTypeController],
  providers: [ContractTypeService, ContractTypeRepository],
  exports: [ContractTypeService],
})
export class ContractTypeModule {}
