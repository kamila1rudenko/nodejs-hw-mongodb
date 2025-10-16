import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

const swaggerDoc = require('../docs/swagger.json');

import { contactsRouter } from './routers/contacts.js';
import { authRouter } from './routers/auth.js';
import { authenticate } from './middlewares/authenticate.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const createApp = () => {
  const app = express();

  const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        singleLine: false,
        translateTime: 'SYS:HH:mm:ss',
        ignore: 'pid,hostname',
      },
    },
  });

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(pinoHttp({ logger }));

  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

  app.use('/auth', authRouter);
  app.use('/contacts', authenticate, contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
