import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Interaction } from './models/interaction.model';
import { InteractionService } from './interaction.service';
import { InteractionController } from './interaction.controller';
import { InteractionRepository } from './repositories/interaction.repository';

@Module({
  imports: [SequelizeModule.forFeature([Interaction])],
  controllers: [InteractionController],
  providers: [InteractionService, InteractionRepository],
  exports: [InteractionService],
})
export class InteractionModule {}
