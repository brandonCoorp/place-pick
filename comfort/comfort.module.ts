import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comfort } from './models/comfort.model';
import { ComfortService } from './comfort.service';
import { ComfortController } from './comfort.controller';
import { ComfortRepository } from './repositories/comfort.repository';

@Module({
  imports: [SequelizeModule.forFeature([Comfort])],
  controllers: [ComfortController],
  providers: [
    ComfortService,
    ComfortRepository,
  ],
  exports: [ComfortService],
})
export class ComfortModule {}
