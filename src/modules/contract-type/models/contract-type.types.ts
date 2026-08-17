import { Optional } from 'sequelize';

export interface ContractTypeAttributes {
  id: string;
  name: string;
  code: string;
  description?: string;
  created_at: Date;
  updated_at: Date;
}

export type ContractTypeCreationAttributes = Optional<
  ContractTypeAttributes,
  'id' | 'description' | 'created_at' | 'updated_at'
>;