import { Optional } from 'sequelize';

export interface PropertyRuleAttributes {
  id: string;
  propertyId: string;
  ruleId: string;
  status?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type PropertyRuleCreationAttributes = Optional<
  PropertyRuleAttributes,
  'id' | 'status' | 'createdAt' | 'updatedAt'
>;