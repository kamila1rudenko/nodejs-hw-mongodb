import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { contactsRouter } from './routers/contacts.js';
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
  app.use(pinoHttp({ logger }));

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
