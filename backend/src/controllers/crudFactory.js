import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

const scopeFilter = (req) => {
  const filter = {};
  if (req.user?.restaurant) filter.restaurant = req.user.restaurant;
  if (req.user?.branch && !['super_admin', 'merchant'].includes(req.user.role)) filter.branch = req.user.branch;
  return filter;
};

export const createOne = (Model) => asyncHandler(async (req, res) => {
  const doc = await Model.create({ ...req.body, restaurant: req.body.restaurant || req.user?.restaurant, branch: req.body.branch || req.user?.branch });
  ok(res, doc, 'Created', 201);
});

export const getMany = (Model) => asyncHandler(async (req, res) => {
  const docs = await Model.find({ ...scopeFilter(req), ...req.query }).sort('-createdAt').limit(200);
  ok(res, docs);
});

export const getOne = (Model) => asyncHandler(async (req, res) => {
  const doc = await Model.findOne({ _id: req.params.id, ...scopeFilter(req) });
  if (!doc) throw new AppError('Resource not found', 404);
  ok(res, doc);
});

export const updateOne = (Model) => asyncHandler(async (req, res) => {
  const doc = await Model.findOneAndUpdate({ _id: req.params.id, ...scopeFilter(req) }, req.body, { new: true, runValidators: true });
  if (!doc) throw new AppError('Resource not found', 404);
  ok(res, doc, 'Updated');
});

export const deleteOne = (Model) => asyncHandler(async (req, res) => {
  const doc = await Model.findOneAndDelete({ _id: req.params.id, ...scopeFilter(req) });
  if (!doc) throw new AppError('Resource not found', 404);
  ok(res, null, 'Deleted');
});
