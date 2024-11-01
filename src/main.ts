import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AppConfigType, appRegToken } from './configs/app.config';
import { isDev } from './common/utils/env.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const { port } = configService.get<AppConfigType>(appRegToken);
  app.setGlobalPrefix('api');
  await app.listen(port, () => {
    if (isDev()) {
      console.log(`Application is running on: http://localhost:${port}`);
    }
  });
}

bootstrap();
