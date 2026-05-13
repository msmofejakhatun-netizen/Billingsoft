import { Order } from '../models/Order.js';
import { Payment } from '../models/Payment.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

export const analytics = asyncHandler(async (req, res) => {
  const filter = { restaurant: req.user.restaurant };
  if (req.query.branch || req.user.branch) filter.branch = req.query.branch || req.user.branch;
  const [orders, payments] = await Promise.all([Order.countDocuments(filter), Payment.find(filter).limit(500)]);
  const revenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
  ok(res, { orders, revenue, averageTicket: orders ? revenue / orders : 0, liveTables: 0 });
});
