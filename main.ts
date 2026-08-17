import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import * as express from 'express';
import { ErrorInterceptor, LoggingInterceptor } from './core/interceptors/error.interceptor';
import { GlobalExceptionFilter } from './http-exception/http-exception.filter';
import { CustomValidationPipe } from './common/api-error-response/custom-validation-pipe.pipe';

async function bootstrap() {
 const app = await NestFactory.create(AppModule, {
  bodyParser: true,
});

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
    new ErrorInterceptor(),
  );

  app.setGlobalPrefix('place-pick-core/api/v1');

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));
  app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
  }),new CustomValidationPipe(),);
  app.useGlobalFilters(new GlobalExceptionFilter());

  app.enableCors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });

  await app.listen(process.env.PORT || 3000, () => {
    console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
  });
}
bootstrap();
