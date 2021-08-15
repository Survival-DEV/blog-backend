import { INestApplication } from '@nestjs/common';
import { json, urlencoded } from 'express';
import helmet from 'helmet';
import csurf from 'csurf';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import morgan from 'morgan';


export function setupSecurity(app: INestApplication): void {
  app.use(helmet());
  app.use(compression());
  app.use(morgan('combined'));
  app.use(
    json({
      limit: '10mb',
    }),
  );

  app.enableCors({
    origin: (req, callback) => {
      const whiteListOrigin = !req || process.env.WHITELIST.includes(req);
      callback(
        whiteListOrigin ? null : new Error('NOT ALLOWED ORIGIN'),
        whiteListOrigin,
      );
    },
    methods: process.env.ALLOWED_METHODS,
    credentials: true,
    allowedHeaders: 'Content-Type, Authorization',
    maxAge: 86400,
  });

  // handling csurf
  app.use(urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(csurf({ cookie: true }));
  app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') {
      res.status(403);
      res.send('this session has expired or form tampered with');
      return next(err);
    }
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });
}
