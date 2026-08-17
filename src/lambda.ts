import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@codegenie/serverless-express';
import { Context } from 'aws-lambda';
import express from 'express';

import { AppModule } from './app.module';

let cachedServer;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();

    const nestApp = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
      { logger: ['error', 'warn'] },
    );

    nestApp.enableCors({
      origin: '*',
    });

    nestApp.setGlobalPrefix('api/v1');

    await nestApp.init();

    cachedServer = serverlessExpress({
      app: expressApp,
    });
  }

  return cachedServer;
}

export const handler = async (event: any, context: Context) => {
  try {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Event:', event);
    }

    if (event.source === 'aws.scheduler') {
      return { statusCode: 200 };
    }

    const server = await bootstrap();

    return await server(event, context); 
  } catch (error) {
    console.error('🔥 Lambda crash:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal error' }),
    };
  }
};