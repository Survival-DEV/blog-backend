import { INestApplication } from '@nestjs/common';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';

export function setupSecurity(app: INestApplication): void {
  const corsOptions = {
    origin: (req, callback) => {
      if (!req || process.env.WHITELIST.indexOf(req.header('Origin')) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('NOT ALLOWED ORIGIN'), false);
      }
    },
    methods: process.env.ALLOWED_METHODS,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    maxAge: 86400,
  };

  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));
  app.enableCors(corsOptions);
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  // app.use(csurf({ cookie: true}));
  app.use(
    json({
      limit: '10mb',
    }),
  );
}
