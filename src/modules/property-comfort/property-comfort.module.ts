import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PropertyComfort } from './models/property-comfort.model';
import { PropertyComfortService } from './property-comfort.service';
import { PropertyComfortRepository } from './repositories/property-comfort.repository';

import { PropertyComfortController } from './property-comfort.controller';

@Module({
  imports: [SequelizeModule.forFeature([PropertyComfort])],
  controllers: [PropertyComfortController],
  providers: [PropertyComfortService, PropertyComfortRepository],
  exports: [PropertyComfortService],
})
export class PropertyComfortModule {}
