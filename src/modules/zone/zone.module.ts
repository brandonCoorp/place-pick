import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Zone } from './models/zone.model';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { ZoneRepository } from './repositories/zone.repository';

@Module({
  imports: [SequelizeModule.forFeature([Zone])],
  controllers: [ZoneController],
  providers: [ZoneService, ZoneRepository],
  exports: [ZoneService],
})
export class ZoneModule {}
