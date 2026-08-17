import { Controller, Post, Delete, Param } from '@nestjs/common';
import { PropertyRuleService } from './property-rule.service';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';
import { PropertyRuleResponseDto } from './dto/response-property-rule.dto';

@Controller('property/:propertyId/rule')
export class PropertyRuleController {
  constructor(private readonly propertyRuleService: PropertyRuleService) {}

  @Post(':ruleId')
  @Serialize(PropertyRuleResponseDto)
  async addRule(
    @Param('propertyId') propertyId: string,
    @Param('ruleId') ruleId: string,
  ) {
    return await this.propertyRuleService.assignSingleRule(propertyId, ruleId);
  }

  @Delete(':ruleId')
  @Serialize(PropertyRuleResponseDto)
  async removeRule(
    @Param('propertyId') propertyId: string,
    @Param('ruleId') ruleId: string,
  ) {
    return await this.propertyRuleService.removeSingleRule(propertyId, ruleId);
  }
}