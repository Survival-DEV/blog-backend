import { ConnectionOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { PROD_ENV } from './src/constants';

const config = {
  url: process.env.DATABASE_URL,
};

const connectionOptions: TypeOrmModuleOptions | ConnectionOptions = {
  type: 'postgres',
  url: config.url,
  synchronize: false,
  migrationsRun: true,
  logging: !!process.env.logDB,
  migrationsTableName: 'migrations',
  maxQueryExecutionTime: 1000,
  entities: ['dist/src/database/entities/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'debug',
  cli: {
    entitiesDir: `./src/database/entities`,
    migrationsDir: `./src/database/migrations`,
  },
};

export default connectionOptions;
