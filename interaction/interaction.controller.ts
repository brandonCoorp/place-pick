import { Controller, Get, Post, Body } from '@nestjs/common';
import { InteractionService } from './interaction.service';
import { CreateInteractionDto } from './dto/create-interaction.dto';
import { InteractionResponseDto } from './dto/interaction-response.dto';
import { Serialize } from 'src/common/interceptors/serialize.interceptor';

@Controller('interaction')
export class InteractionController {
  constructor(private readonly interactionService: InteractionService) {}

  @Post()
  @Serialize(InteractionResponseDto)
  async create(@Body() createInteractionDto: CreateInteractionDto) {
    return await this.interactionService.create(createInteractionDto);
  }

  @Get()
  @Serialize(InteractionResponseDto)
  async findAll() {
    return await this.interactionService.findAll();
  }
}
