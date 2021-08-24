import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PROD_ENV } from '../constants';

export const setupSwagger = (app: INestApplication): void => {
  const url = process.env.NODE_ENV === PROD_ENV ? 'https' : 'http';

  const config = new DocumentBuilder()
    .setTitle('LECTURA')
    .setDescription('blog API')
    .setVersion('1.0')
    .addTag('blogs')
    //TODO: Replace those with env var(s)
    .setContact(
      'Blogger_Backend',
      'https://github.com/Survival-DEV/blog-backend/',
      'shawar.nujood@gmail.com',
    )
    .addBearerAuth()
    .addServer(`${url}://`)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
