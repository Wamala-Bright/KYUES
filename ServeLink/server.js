import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import router from './src/routes.js';
import { testConnection } from './src/models/db.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Log each request while developing.
app.use((req, res, next) => {
  if (NODE_ENV === 'development') {
    console.log(`${req.method} ${req.url}`);
  }
  next();
});

// Make the environment available in every EJS view.
app.use((req, res, next) => {
  res.locals.NODE_ENV = NODE_ENV;
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);

// Express identifies error middleware by its four-argument signature.
app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  const status = Number.isInteger(err.status) ? err.status : 500;
  const template = status === 404 ? '404' : '500';
  return res.status(status).render(`errors/${template}`, {
    title: status === 404 ? 'Page Not Found' : 'Server Error',
    error: err.message,
    stack: err.stack
  });
});

const server = app.listen(port, async () => {
  console.log('-----------------------------------');
  console.log('KYUES SERVER STARTED');
  console.log(`URL: http://127.0.0.1:${port}`);
  console.log(`Environment: ${NODE_ENV}`);
  console.log('-----------------------------------');

  try {
    await testConnection();
    console.log('Database connection successful.');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.error('Check DATABASE_URL in your .env file.');
  }
});

const shutdown = (signal) => {
  console.log(`\n${signal} received. Closing server...`);
  server.close(() => {
    console.log('KYUES server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
