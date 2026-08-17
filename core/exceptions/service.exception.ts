import { HttpStatus } from '@nestjs/common';
import { ApiErrorCode, getErrorMessage } from '../enums/api-error.enum';

export class ServiceException extends Error {
  public readonly statusCode: number;
  public readonly error: string;
  public readonly errorCode?: ApiErrorCode;

  constructor(message?: string, error?: string, statusCode: number = HttpStatus.BAD_REQUEST, errorCode?: ApiErrorCode) {
    const finalMessage = message || (errorCode ? getErrorMessage(errorCode) : 'Service Error');
    super(finalMessage);
    this.name = this.constructor.name;
    this.error = error || finalMessage;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      message: this.message,
      error: this.error,
      statusCode: this.statusCode,
      errorCode: this.errorCode,
    };
  }
}
