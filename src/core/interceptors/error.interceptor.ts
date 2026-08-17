import { CallHandler, ExecutionContext, Injectable, NestInterceptor, BadRequestException, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ServiceException } from '../exceptions/service.exception';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof ServiceException) {
          return throwError(
            () =>
              new BadRequestException({
                message: error.message,
                error: error.error,
                statusCode: error.statusCode,
                errorCode: error.errorCode,
              }),
          );
        }
        // Handle other common error types (e.g., AxiosError if used in this project)
        if (error.isAxiosError) {
          return throwError(
            () =>
              new HttpException(
                {
                  message: 'Failed dependency',
                  error: `${error.config?.url} ${error.message}`,
                  statusCode: HttpStatus.FAILED_DEPENDENCY,
                },
                HttpStatus.FAILED_DEPENDENCY,
              ),
          );
        }
        return throwError(() => error);
      }),
    );
  }
}

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body, query, params } = request;
    
    this.logger.log(`Request: ${method} ${url}`);
    if (Object.keys(body || {}).length) this.logger.debug('Body:', body);
    if (Object.keys(query || {}).length) this.logger.debug('Query:', query);

    const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (response) => {
          const responseTime = Date.now() - now;
          this.logger.log(`Response: ${method} ${url} - ${responseTime}ms`);
        },
        error: (error) => {
          const responseTime = Date.now() - now;
          this.logger.error(`Error: ${method} ${url} - ${responseTime}ms`, {
            message: error.message,
            statusCode: error.status || error.statusCode,
            response: error.response,
          });
        },
      }),
    );
  }
}
