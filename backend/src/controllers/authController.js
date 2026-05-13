import { User } from '../models/User.js';
import { Restaurant } from '../models/Restaurant.js';
import { Branch } from '../models/Branch.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';
import { ROLES } from '../utils/roles.js';
import { signAccessToken } from '../services/tokenService.js';
import { env } from '../config/env.js';

const sanitizeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  role: user.role,
  restaurant: user.restaurant,
  branch: user.branch,
  permissions: user.permissions,
  isActive: user.isActive
});

const authPayload = (user) => {
  const accessToken = signAccessToken(user);
  return { accessToken, token: accessToken, user: sanitizeUser(user) };
};

const assertUniqueEmail = async (email) => {
  const existingUser = await User.exists({ email });
  if (existingUser) throw new AppError('Email is already registered', 409);
};

export const register = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role, restaurant, branch } = req.body;
  await assertUniqueEmail(email);

  if (role === ROLES.SUPER_ADMIN && !env.allowSuperAdminRegistration) {
    throw new AppError('Super admin registration is disabled', 403);
  }

  const user = await User.create({ name, email, phone, password, role, restaurant, branch });
  ok(res, authPayload(user), 'Registered successfully', 201);
});

export const registerRestaurant = asyncHandler(async (req, res) => {
  const { ownerName, email, phone, password, restaurantName, branchName, gstin } = req.body;
  await assertUniqueEmail(email);

  const owner = await User.create({ name: ownerName, email, phone, password, role: ROLES.MERCHANT });
  const restaurant = await Restaurant.create({ name: restaurantName, owner: owner._id, gstin });
  const branch = await Branch.create({ restaurant: restaurant._id, name: branchName || 'Main Branch', code: 'MAIN' });
  owner.restaurant = restaurant._id;
  owner.branch = branch._id;
  await owner.save();
  ok(res, authPayload(owner), 'Restaurant registered', 201);
});

export const createStaffUser = asyncHandler(async (req, res) => {
  const { name, email, phone, password, role, permissions } = req.body;
  await assertUniqueEmail(email);

  const restaurant = req.user.role === ROLES.SUPER_ADMIN ? req.body.restaurant : req.user.restaurant;
  const branch = req.body.branch || req.user.branch;
  if (!restaurant) throw new AppError('Restaurant is required to create staff users', 400);

  const user = await User.create({ name, email, phone, password, role, restaurant, branch, permissions });
  ok(res, sanitizeUser(user), 'Staff user created', 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid email or password', 401);
  if (!user.isActive) throw new AppError('Account is disabled', 403);

  ok(res, authPayload(user), 'Logged in');
});

export const me = asyncHandler(async (req, res) => ok(res, sanitizeUser(req.user)));

export const logout = asyncHandler(async (_req, res) => ok(res, null, 'Logged out'));
