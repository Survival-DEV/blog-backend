import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { PROD_ENV } from '../constants';
import { SWAGGER_CONGIF } from './swagger.config';

export const setupSwagger = (app: INestApplication): void => {
  const server_url = process.env.NODE_ENV === PROD_ENV ? 'https' : 'http';
  const { url, name, email } = SWAGGER_CONGIF.contact;

  const builder = new DocumentBuilder()
    .setTitle(SWAGGER_CONGIF.title)
    .setDescription(SWAGGER_CONGIF.description)
    .setVersion(SWAGGER_CONGIF.version)
    .addBearerAuth(
      {
        type: 'apiKey' || 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'authorization',
    )
    .setContact(name, url, email)
    .addServer(`${url}://`);
  for (const tag of SWAGGER_CONGIF.tags) {
    builder.addTag(tag);
  }

  const options = builder.build();
  const createDocument = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/v1/doc', app, createDocument);
};
