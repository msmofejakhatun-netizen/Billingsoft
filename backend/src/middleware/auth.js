import { verifyAccessToken } from '../services/tokenService.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const protect = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) throw new AppError('Authentication token required', 401);

  const token = header.split(' ')[1];
  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.id).select('-password');
  if (!user || !user.isActive) throw new AppError('User is not authorized', 401);

  req.user = user;
  req.auth = decoded;
  next();
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) throw new AppError('Insufficient permissions', 403);
  next();
};

export const requireRestaurantScope = (req, _res, next) => {
  if (!req.user.restaurant && req.user.role !== 'super_admin') throw new AppError('Restaurant scope is required', 403);
  next();
};
