import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map } from 'rxjs/operators';

export function Serialize(dto: any) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}

  intercept(context: ExecutionContext, handler: CallHandler) {
    return handler.handle().pipe(
      map((data) => {
        if (Array.isArray(data)) {
          return data.map(item =>
            plainToInstance(this.dto, this.toPlain(item), {
              excludeExtraneousValues: true,
            }),
          );
        }

        return plainToInstance(this.dto, this.toPlain(data), {
          excludeExtraneousValues: true,
        });
      }),
    );
  }

  private toPlain(data: any) {
    if (data && typeof data.get === 'function') {
      return data.get({ plain: true }); 
    }
    return data;
  }
}