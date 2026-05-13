import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import xss from 'xss-clean';
import { env } from '../config/env.js';

export const securityMiddleware = [
  helmet(),
  cors({ origin: env.corsOrigin.split(','), credentials: true }),
  compression(),
  mongoSanitize(),
  xss(),
  hpp(),
  rateLimit({ windowMs: env.rateLimitWindowMs, max: env.rateLimitMax, standardHeaders: true, legacyHeaders: false })
];
