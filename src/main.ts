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
import { I18nService } from '~/shared/i18n/i18n.service';
import { SWAGGER_API_ROOT } from './common/constants/swagger.const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<AppConfigType>(appRegToken);

  const i18nService = app.get(I18nService);

  app.setGlobalPrefix(SWAGGER_API_ROOT);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) =>
        validationExceptionFactory(errors, i18nService),
      whitelist: true,
      enableDebugMessages: isDev(),
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
