import { User } from '../models/User.js';
import { Restaurant } from '../models/Restaurant.js';
import { Branch } from '../models/Branch.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';
import { ROLES } from '../utils/roles.js';
import { signToken } from '../services/tokenService.js';

const authPayload = (user) => ({ token: signToken(user), user: { id: user._id, name: user.name, email: user.email, role: user.role, restaurant: user.restaurant, branch: user.branch } });

export const registerRestaurant = asyncHandler(async (req, res) => {
  const { ownerName, email, phone, password, restaurantName, branchName, gstin } = req.body;
  const owner = await User.create({ name: ownerName, email, phone, password, role: ROLES.MERCHANT });
  const restaurant = await Restaurant.create({ name: restaurantName, owner: owner._id, gstin });
  const branch = await Branch.create({ restaurant: restaurant._id, name: branchName || 'Main Branch', code: 'MAIN' });
  owner.restaurant = restaurant._id;
  owner.branch = branch._id;
  await owner.save();
  ok(res, authPayload(owner), 'Restaurant registered', 201);
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) throw new AppError('Invalid email or password', 401);
  ok(res, authPayload(user), 'Logged in');
});

export const me = asyncHandler(async (req, res) => ok(res, req.user));
