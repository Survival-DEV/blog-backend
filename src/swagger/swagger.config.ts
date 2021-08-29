import { SwaggerConfig } from './swagger.interface';

export const SWAGGER_CONGIF: SwaggerConfig = {
  title: 'LECTURA',
  description: 'blog API',
  version: '1.0',
  tags: ['blogs'],
  contact: {
    name: "lectura_team",
    url: 'https://github.com/Survival-DEV/blog-backend/',
    email:  process.env.CONTACT_EMAIL,
  },
};
