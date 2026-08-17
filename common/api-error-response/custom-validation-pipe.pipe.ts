import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { ApiErrorResponse } from './api-response';
import { ApiErrorCode } from './api-error.enum';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToInstance(metatype, value);


    const errors = await validate(object, {
      whitelist: true, 
      forbidNonWhitelisted: true, 
      transform: true,
    });

    if (errors.length > 0) {
      const messages = this.formatErrors(errors);

      throw new BadRequestException(
        new ApiErrorResponse(ApiErrorCode.BAD_REQUEST, messages),
      );
    }

    return object; 
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]): string[] {
    const result: string[] = [];

    const extractErrors = (errs: ValidationError[], parent = '') => {
      for (const err of errs) {
        const propertyPath = parent
          ? `${parent}.${err.property}`
          : err.property;

        if (err.constraints) {
          result.push(...Object.values(err.constraints));
        }

        if (err.children && err.children.length > 0) {
          extractErrors(err.children, propertyPath);
        }
      }
    };

    extractErrors(errors);
    return result;
  }
}