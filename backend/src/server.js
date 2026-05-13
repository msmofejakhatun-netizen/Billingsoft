import http from 'http';
import { app } from './app.js';
import { connectDatabase } from './config/database.js';
import { env } from './config/env.js';
import { initSocket } from './sockets/index.js';

const server = http.createServer(app);
initSocket(server);

const start = async () => {
  await connectDatabase();
  server.listen(env.port, () => console.log(`API listening on port ${env.port}`));
};

start().catch((error) => {
  console.error('Failed to start server', error);
  process.exit(1);
});
