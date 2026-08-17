import { Injectable, NotFoundException } from '@nestjs/common';
import { PropertyComfortRepository } from './repositories/property-comfort.repository';
import { Transaction } from 'sequelize';

@Injectable()
export class PropertyComfortService {
  constructor(
    private readonly propertyComfortRepository: PropertyComfortRepository,
  ) {}

  async assignComforts(propertyId: string, comfortIds: string[], transaction?: Transaction) {
    const data = comfortIds.map((comfortId) => ({
      propertyId,
      comfortId,
    }));
    await this.propertyComfortRepository.bulkCreate(data, transaction);
  }

  async assignSingleComfort(propertyId: string, comfortId: string, transaction?: Transaction) {
    const existing = await this.propertyComfortRepository.findOneByPropertyAndComfort(propertyId, comfortId);

    if (existing) {
      if (existing.status !== 'active') {
        await this.propertyComfortRepository.updateStatus(existing.id, 'active', transaction);
      }
      existing.status = 'active';
      return existing;
    }

    return await this.propertyComfortRepository.create({
      propertyId,
      comfortId,
    }, transaction);
  }

  async removeSingleComfort(propertyId: string, comfortId: string, transaction?: Transaction) {
    const existing = await this.propertyComfortRepository.findOneByPropertyAndComfort(propertyId, comfortId);

    if (!existing) {
      throw new NotFoundException('Relationship not found');
    }

    await this.propertyComfortRepository.updateStatus(existing.id, 'inactive', transaction);
    existing.status = 'inactive';
    return existing;
  }

  async removeAllByPropertyId(propertyId: string, transaction?: Transaction) {
    await this.propertyComfortRepository.deleteByPropertyId(propertyId, transaction);
  }
}
