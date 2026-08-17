import { Optional } from 'sequelize';

export interface CategoryAttributes {
  id: string;
  name: string;
  code: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryCreationAttributes = Optional<
  CategoryAttributes,
  'id' | 'description' | 'createdAt' | 'updatedAt'
>;