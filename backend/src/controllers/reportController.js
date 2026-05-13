import { Order } from '../models/Order.js';
import { Expense } from '../models/Expense.js';
import { Report } from '../models/Report.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';

export const dayEndReport = asyncHandler(async (req, res) => {
  const start = req.query.start ? new Date(req.query.start) : new Date(new Date().setHours(0, 0, 0, 0));
  const end = req.query.end ? new Date(req.query.end) : new Date();
  const orderFilter = { restaurant: req.user.restaurant, branch: req.query.branch || req.user.branch, createdAt: { $gte: start, $lte: end } };
  const orders = await Order.find(orderFilter);
  const expenses = await Expense.find({ restaurant: req.user.restaurant, branch: orderFilter.branch, spentAt: { $gte: start, $lte: end } });
  const metrics = {
    orders: orders.length,
    grossSales: orders.reduce((sum, order) => sum + order.totals.subtotal, 0),
    discounts: orders.reduce((sum, order) => sum + order.totals.discount, 0),
    taxes: orders.reduce((sum, order) => sum + order.totals.cgst + order.totals.sgst, 0),
    netSales: orders.reduce((sum, order) => sum + order.totals.grandTotal, 0),
    expenses: expenses.reduce((sum, expense) => sum + expense.amount, 0)
  };
  const report = await Report.create({ restaurant: req.user.restaurant, branch: orderFilter.branch, type: 'day_end', periodStart: start, periodEnd: end, metrics, generatedBy: req.user._id });
  ok(res, report, 'Day-end report generated');
});
