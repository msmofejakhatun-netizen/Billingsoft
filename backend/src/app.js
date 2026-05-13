import express from 'express';
import morgan from 'morgan';
import { securityMiddleware } from './middleware/security.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import apiRoutes from './routes/index.js';
import { env } from './config/env.js';

export const app = express();

app.set('trust proxy', 1);

app.get('/', (_req, res) => res.status(200).json({
  success: true,
  message: 'BillingSoft API running'
}));

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(...securityMiddleware);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use('/uploads', express.static(env.uploadDir));

app.get('/health', (_req, res) => res.json({ success: true, service: 'billingsoft-api', timestamp: new Date().toISOString() }));
app.use('/api/v1', apiRoutes);
app.use(notFound);
app.use(errorHandler);
