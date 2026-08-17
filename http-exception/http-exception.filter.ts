import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

import { ApiErrorResponse } from '../common/api-error-response/api-response';
import { ApiErrorCode } from '../common/api-error-response/api-error.enum';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = ['Internal server error'];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();

      if (typeof res === 'object') {
        message = (res as any).message || message;
      } else {
        message = [res as string];
      }
    }

    response.status(status).json(
      new ApiErrorResponse(
        ApiErrorCode.INTERNAL_SERVER_ERROR,
        message,
      ),
    );
  }
}