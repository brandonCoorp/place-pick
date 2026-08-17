import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class PaginationQueryTransformPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) return value;

    const { page, limit, orderBy, orderDirection, ...rest } = value;

    const cleanQuery = {};
    Object.keys(rest).forEach(key => {
      let val = rest[key];

      // 1. Convertir comas a array si es un string (ej: "1,2,3")
      if (typeof val === 'string' && val.includes(',') && !['search', 'address', 'title', 'description'].includes(key)) {
        val = val.split(',').map(item => item.trim());
      }

      // 2. Forzar array para campos 'Ids' si no lo son (ej: valor único)
      if (key.endsWith('Ids') && !Array.isArray(val)) {
        val = [val];
      }

      cleanQuery[key] = val;
    });

    return {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      orderBy: orderBy || 'createdAt',
      orderDirection: orderDirection || 'DESC',
      query: cleanQuery,
    };
  }
}
