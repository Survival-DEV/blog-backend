import { ConnectionOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PROD_ENV } from './src/constants';


const config = {
  url: process.env.DATABASE_URL,
};

const connectionOptions: TypeOrmModuleOptions | ConnectionOptions = {
  type: 'postgres',
  url: config.url,
  entities: ['dist/src/**/*.entity.js'],
  synchronize: true,
  migrations: ['dist/src/database/migrations/*.js'],
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  cli: {
    migrationsDir: 'src/database/migrations',
  },
};

export default connectionOptions;
