import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { PropertyModule } from './modules/property/property.module';
import { CategoryModule } from './modules/category/category.module';
import { ZoneModule } from './modules/zone/zone.module';
import { PropertyOwnerModule } from './modules/property-owner/property-owner.module';
import { OwnerModule } from './modules/owner/owner.module';
import { ComfortModule } from './modules/comfort/comfort.module';
import { PropertyComfortModule } from './modules/property-comfort/property-comfort.module';
import { InteractionModule } from './modules/interaction/interaction.module';
import { ImageModule } from './modules/image/image.module';
import { RuleModule } from './modules/rule/rule.module';
import { PropertyCategoryModule } from './modules/property-category/property-category.module';
import { ContractTypeModule } from './modules/contract-type/contract-type.module';
import { ContractTypePropertyModule } from './modules/contract-type-property/contract-type-property.module';
import { PropertyRuleModule } from './modules/property-rule/property-rule.module';
import { NavigationModule } from './modules/navigation/navigation.module';
import { LocationModule } from './modules/location/location.module';

@Module({
  imports: [ConfigModule, DatabaseModule,
 PropertyModule, 
 CategoryModule, 
 ZoneModule,
   PropertyOwnerModule, 
   OwnerModule,
   ComfortModule, 
   PropertyComfortModule,
   InteractionModule, 
   ImageModule, 
   RuleModule,
   PropertyCategoryModule,
   ContractTypeModule,
   ContractTypePropertyModule,
   PropertyRuleModule,
   NavigationModule,
   LocationModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
