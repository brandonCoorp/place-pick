import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Owner } from './models/owner.model';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { OwnerRepository } from './repositories/owner.repository';

@Module({
  imports: [SequelizeModule.forFeature([Owner])],
  controllers: [OwnerController],
  providers: [OwnerService, OwnerRepository],
  exports: [OwnerService],
})
export class OwnerModule {}
