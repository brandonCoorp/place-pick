import { Injectable } from '@nestjs/common';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { InteractionRepository } from './repositories/interaction.repository';

@Injectable()
export class InteractionService {
  constructor(private readonly interactionRepository: InteractionRepository) {}

  async create(createInteractionDto: CreateInteractionDto) {
    return await this.interactionRepository.create(createInteractionDto);
  }

  async findAll() {
    return await this.interactionRepository.findAll();
  }
}
