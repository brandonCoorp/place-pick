import { Optional } from 'sequelize';

export interface RuleAttributes {
  id: string;
  name: string;
  code: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export type RuleCreationAttributes = Optional<
  RuleAttributes,
  'id' | 'description' | 'created_at' | 'updated_at'
>;