/* eslint-disable @typescript-eslint/ban-types */
import { PROD_ENV } from './src/constants';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

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
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['dist/src/models/entities/*.entity.js'],
  migrations: ['dist/src/models/migrations/*.js'],
  factories: ['dist/src/models/factories/*.js'],
  seeds: ['dist/src/models/seeds/**/*.js'],
  cli: {
    entitiesDir: `./src/models/entities`,
    migrationsDir: `./src/models/migrations`,
  },
};

export default connectionOptions;
