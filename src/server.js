import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { contactsRouter } from './routes/contacts.js';

export const setupServer = async () => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
  app.use(pinoHttp({ logger }));

  app.use('/contacts', contactsRouter);

  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.use((err, req, res, _next) => {
    req.log?.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};
