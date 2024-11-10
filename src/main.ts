import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfigType, appRegToken } from './configs/app.config';
import { isDev } from './common/utils/env.util';
import { setupSwagger } from './common/utils/setupSwagger.util';
import { join } from 'path';
import * as express from 'express';
import { ValidationPipe } from '@nestjs/common';
import { validationExceptionFactory } from '~/common/pipes/validationException.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<AppConfigType>(appRegToken);

  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: validationExceptionFactory,
    }),
  );

  // Serve static files
  app.use('/public', express.static(join(__dirname, '..', 'public')));

  setupSwagger(app, configService);
  await app.listen(port, () => {
    if (isDev()) {
      console.log(`Application is running on: http://localhost:${port}`);
      console.log(`Swagger is running on: http://localhost:${port}/swagger`);
    }
  });
}

bootstrap();
