import { PROD_ENV } from './src/constants';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

const config = {
  url: process.env.DATABASE_URL,
};

interface CustomeConnectionOptions extends PostgresConnectionOptions {
  readonly seeds?: (Function | string)[];
  readonly factories?: (Function | string)[];
  readonly autoSchemaSync?: boolean;
}

const connectionOptions: CustomeConnectionOptions = {
  type: 'postgres',
  url: config.url,
  synchronize: false,
  migrationsRun: false,
  migrationsTableName: 'migrations',
  maxQueryExecutionTime: 1000,
  logging: !!process.env.logDB,
  logger: process.env.NODE_ENV === PROD_ENV ? 'file' : 'advanced-console',
  namingStrategy: new SnakeNamingStrategy(),
  entities: ['dist/**/entities/*.entity.js'],
  migrations: ['dist/src/models/migrations/*.js'],
  factories: ['./src/models/factories/*.ts'],
  seeds: ['./src/models/seeds/*.ts'],
  cli: {
    entitiesDir: `./src/models/entities`,
    migrationsDir: `./src/models/migrations`,
  },
  cache: {
    type: 'redis',
    duration: 30000,
    options: {
      host: 'localhost',
      port: 6379,
    },
  },
};

export default connectionOptions;
