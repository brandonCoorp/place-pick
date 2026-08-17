import { Exclude, Expose } from 'class-transformer';

export class PropertyRuleResponseDto {
  @Expose()
  id: string;

  @Expose()
  propertyId: string;

  @Expose()
  ruleId: string;

  @Expose()
  status: string;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;
}