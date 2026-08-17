import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { Image } from './models/image.model';
import { ImageRepository } from './repositories/image.repository';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CloudinaryProvider } from './providers/cloudinary.provider';
import { StorageFactory } from './image.factory';

@Module({
  imports: [
    SequelizeModule.forFeature([Image]),
    ConfigModule,
  ],
  controllers: [ImageController],
  providers: [
    ImageService,
    ImageRepository,
    CloudinaryProvider,
    StorageFactory,
  ],
  exports: [SequelizeModule, ImageService, ImageRepository],
})
export class ImageModule { }
