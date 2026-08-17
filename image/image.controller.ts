import { Controller, Post, Delete, Param, UploadedFile, UploadedFiles, UseInterceptors, Body, Get } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ImageResponseDto } from './dto/image-response.dto';

@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) { }

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10)) // Permitimos hasta 10 imágenes
  async uploadFiles(
    @UploadedFiles() files: Express.Multer.File[],
    @Body('propertyId') propertyId?: string,
    @Body('provider') provider?: string,
  ) {
    return await this.imageService.uploadMultipleImages(files, propertyId, provider);
  }

  @Get('property/:propertyId')
  async getByProperty(@Param('propertyId') propertyId: string) {
    const images = await this.imageService.findAllByProperty(propertyId);
    return images.map(image => new ImageResponseDto(image.get({ plain: true })));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.imageService.deleteImage(id);
  }
}
