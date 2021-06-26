import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PROD_ENV } from './src/constants';


const config = {
  url: process.env.DATABASE_URL,
};

const connectionOptions: TypeOrmModuleOptions | ConnectionOptions = {
  type: 'postgres',
  url: config.url,
  entities: [join(__dirname, '**/**', '*.entity.{ts,js}')],
  synchronize: true,
  dropSchema: false,
  keepConnectionAlive: true,
  logging: ['warn', 'error'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  migrations: ['dist/database/migrations/*{.ts}'],
  cli: {
    entitiesDir: 'dist/database/entities',
    migrationsDir: 'dist/database/migrations',
  },
  migrationsRun: true,
};

export default connectionOptions;
