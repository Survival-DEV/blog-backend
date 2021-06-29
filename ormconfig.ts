/* eslint-disable @typescript-eslint/ban-types */
import { PROD_ENV } from './src/constants';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config = {
  url: process.env.DATABASE_URL,
};

interface CustomeConnectionOptions extends PostgresConnectionOptions {
  readonly seeds?: (Function | string)[];
  readonly factories?: (Function | string)[];
}

const connectionOptions: CustomeConnectionOptions = {
  type: 'postgres',
  url: config.url,
  synchronize: false,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  maxQueryExecutionTime: 1000,
  logging: !!process.env.logDB,
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'advanced-console',
  entities: ['dist/src/database/entities/*.entity.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  factories: ['dist/src/database/factories/*.js'],
  seeds: ['dist/**/database/seeds/**/*.js'],
  cli: {
    entitiesDir: `./src/database/entities`,
    migrationsDir: `./src/database/migrations`,
  },
};

export default connectionOptions;
