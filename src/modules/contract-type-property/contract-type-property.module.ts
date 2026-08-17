import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ContractTypeProperty } from './models/contract-type-property.model';
import { ContractTypePropertyController } from './contract-type-property.controller';
import { ContractTypePropertyService } from './contract-type-property.service';
import { ContractTypePropertyRepository } from './repositories/contract-type-property.repository';

@Module({
  imports: [SequelizeModule.forFeature([ContractTypeProperty])],
  controllers: [ContractTypePropertyController],
  providers: [ContractTypePropertyService, ContractTypePropertyRepository],
  exports: [ContractTypePropertyService],
})
export class ContractTypePropertyModule {}
