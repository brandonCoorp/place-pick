import { Injectable, BadRequestException } from '@nestjs/common';
import { ImageRepository } from './repositories/image.repository';
import { StorageFactory } from './image.factory';
import { ImageResponseDto } from './dto/image-response.dto';

@Injectable()
export class ImageService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly storageFactory: StorageFactory, // inyectamos la factoría directamente
  ) { }

  async uploadImage(file: Express.Multer.File, propertyId?: string, providerType: string = 'cloudinary') {
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }

    // Obtenemos el proveedor dinámicamente según la necesidad (tráfico, costo, etc.)
    const storageProvider = this.storageFactory.getProvider(providerType);

    // 1. Subir a la nube seleccionada
    const uploadResult = await storageProvider.uploadFile(file);

    // 2. Guardar en base de datos
    const imageData = {
      propertyId: propertyId,
      url: uploadResult.url,
      publicId: uploadResult.publicId,
      status: 'active',
    };

    return await this.imageRepository.create(imageData);
  }

  async findAllByProperty(propertyId: string) {
    return await this.imageRepository.findByPropertyId(propertyId);
  }

  async deleteImage(id: string) {
    const image = await this.imageRepository.findById(id);
    if (!image) {
      throw new BadRequestException('Imagen no encontrada');
    }

    // Aquí también podríamos decidir qué proveedor usar para borrar si guardáramos el provider en la BD
    // Por ahora usamos el default
    const storageProvider = this.storageFactory.getProvider('cloudinary');

    if (image.publicId) {
      await storageProvider.deleteFile(image.publicId);
    }

    await this.imageRepository.delete(id);

    return { message: 'Imagen eliminada correctamente' };
  }

  async uploadMultipleImages(files: Express.Multer.File[], propertyId?: string, providerType: string = 'cloudinary') {
    const results: { success: ImageResponseDto[]; failed: any[] } = {
      success: [],
      failed: []
    };

    if (!files || files.length === 0) {
      throw new BadRequestException('No se proporcionaron archivos');
    }

    for (const file of files) {
      try {
        const image = await this.uploadImage(file, propertyId, providerType);
        results.success.push(new ImageResponseDto(image.get({ plain: true })));
      } catch (error) {
        results.failed.push({
          fileName: file.originalname,
          error: error.message
        });
      }
    }

    return results;
  }
}
