import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { NavigationController } from './navigation.controller';
import { NavigationService } from './navigation.service';
import { NavigationRepository } from './repositories/navigation.repository';

@Module({
  imports: [HttpModule],
  controllers: [NavigationController],
  providers: [NavigationService, NavigationRepository],
  exports: [NavigationService],
})
export class NavigationModule {}
