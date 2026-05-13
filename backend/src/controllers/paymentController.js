import { Payment } from '../models/Payment.js';
import { Order } from '../models/Order.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';
import { emitBranchEvent } from '../sockets/index.js';

export const createPayment = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.order);
  const payment = await Payment.create({
    ...req.body,
    restaurant: order.restaurant,
    branch: order.branch,
    amount: req.body.amount || order.totals.grandTotal,
    invoiceNumber: req.body.invoiceNumber || `INV-${Date.now()}`,
    cashier: req.user._id
  });
  order.status = 'paid';
  await order.save();
  emitBranchEvent(order.branch, 'payment:completed', { payment, orderId: order._id });
  ok(res, payment, 'Payment captured', 201);
});
