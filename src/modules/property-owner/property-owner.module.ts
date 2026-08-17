import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertyOwner } from './models/property-owner.model';
import { PropertyOwnerService } from './property-owner.service';
import { PropertyOwnerRepository } from './repositories/property-owner.repository';

import { PropertyOwnerController } from './property-owner.controller';

@Module({
  imports: [SequelizeModule.forFeature([PropertyOwner])],
  controllers: [PropertyOwnerController],
  providers: [PropertyOwnerService, PropertyOwnerRepository],
  exports: [PropertyOwnerService],
})
export class PropertyOwnerModule {}
