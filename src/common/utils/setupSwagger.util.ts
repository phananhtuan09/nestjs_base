import { SwaggerConfigType, swaggerRegToken } from '~/configs/swagger.config';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Response, ResponsePagination } from '~/shared/model/response.model';
import * as fs from 'fs';
import { join } from 'path';
import {
  GLOBAL_PARAMETERS,
  SWAGGER_DESCRIPTION,
  SWAGGER_PATH,
  SWAGGER_TITLE,
} from '../constants/swagger.const';

export function setupSwagger(
  app: INestApplication,
  configService: ConfigService<any>,
): void {
  const { version, enable } =
    configService.get<SwaggerConfigType>(swaggerRegToken);
  if (!enable) {
    return;
  }

  const config = new DocumentBuilder()
    .addGlobalParameters(...GLOBAL_PARAMETERS)
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [Response, ResponsePagination],
  });
  SwaggerModule.setup(SWAGGER_PATH, app, document, {
    customJs: '/public/swagger-add-download-link.js',
  });

  const outputDir = join(__dirname, '../../../'); // Root directory

  // Export the Swagger JSON
  const outputPath = join(outputDir, 'swagger-spec.json');
  fs.writeFileSync(outputPath, JSON.stringify(document, null, 2));

  // Serve the Swagger JSON file
  app.use('/swagger-spec.json', (req, res) => {
    if (!fs.existsSync(outputPath)) {
      res.status(404).send('Swagger JSON file not found');
      return;
    }
    res.sendFile(outputPath);
  });
}
