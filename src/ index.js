import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import { setupServer } from './server.js';

const bootstrap = async () => {
  await initMongoConnection();
  await setupServer();
};

bootstrap().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
