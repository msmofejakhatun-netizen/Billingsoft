import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const signAccessToken = (user) => jwt.sign(
  { id: user._id.toString(), role: user.role, restaurant: user.restaurant, branch: user.branch },
  env.jwtSecret,
  { expiresIn: env.jwtExpiresIn }
);

export const verifyAccessToken = (token) => jwt.verify(token, env.jwtSecret);

export const signToken = signAccessToken;
