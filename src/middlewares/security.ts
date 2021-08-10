import { INestApplication } from '@nestjs/common';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';

const corsOptions = {
  origin: (req, callback) => {
    if (!req || process.env.WHITELIST.indexOf(req.header('Origin')) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('NOT ALLOWED ORIGIN'), false);
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
  allowedHeaders: 'Content-Type',
  maxAge: 86400,
};

export function setupSecurity(app: INestApplication): void {
  app.use(helmet());
  app.use(urlencoded({ extended: true }));
  app.use(cookieParser());
  app.enableCors(corsOptions);
  app.use(csurf({ cookie: true }));

  app.use(
    json({
      limit: '10mb',
    }),
  );
}
