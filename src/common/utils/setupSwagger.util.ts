import { SwaggerConfigType, swaggerRegToken } from '~/configs/swagger.config';
import { ConfigService } from '@nestjs/config';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';
import { join } from 'path';

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
    .addGlobalParameters(
      {
        name: 'lang',
        in: 'query',
        required: false,
      },
      {
        name: 'version',
        in: 'query',
        required: false,
      },
    )
    .setTitle('Nestjs Base API Documentation')
    .setDescription('Description')
    .setVersion(version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/swagger', app, document, {
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
