import 'dotenv/config';
import { createApp } from './app.js';
import { initMongoConnection } from './db.js';

const {
  MONGODB_URI,
  MONGODB_USER,
  MONGODB_PASSWORD,
  MONGODB_URL,
  MONGODB_DB,
  PORT = 3000,
} = process.env;

const uri =
  MONGODB_URI ??
  `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

const start = async () => {
  await initMongoConnection(uri);

  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

start().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
