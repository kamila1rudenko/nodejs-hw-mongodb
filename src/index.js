import 'dotenv/config';
import { initMongoConnection } from './db/initMongoConnection.js';
import { startServer } from './server.js';

const run = async () => {
  await initMongoConnection();
  await startServer();
};

run().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
