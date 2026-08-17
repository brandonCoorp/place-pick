import { HttpException, HttpStatus } from '@nestjs/common';
import { ApiErrorResponse } from './api-response';

export class CustomHttpException extends HttpException {
  constructor(apiErrorResponse: ApiErrorResponse, statusCode: HttpStatus) {
    super(apiErrorResponse, statusCode);
  }
}
