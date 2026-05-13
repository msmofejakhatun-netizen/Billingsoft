import { Order } from '../models/Order.js';
import { KotOrder } from '../models/KotOrder.js';
import { Table } from '../models/Table.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';
import { emitBranchEvent, emitRestaurantEvent } from '../sockets/index.js';

const calculateTotals = (items = [], discount = 0) => {
  const subtotal = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0), 0);
  const tax = items.reduce((sum, item) => sum + (Number(item.price || 0) * Number(item.quantity || 0) * Number(item.gstRate || 0)) / 100, 0);
  return { subtotal, discount, cgst: tax / 2, sgst: tax / 2, serviceCharge: 0, grandTotal: subtotal + tax - discount };
};

export const createOrder = asyncHandler(async (req, res) => {
  const totals = calculateTotals(req.body.items, req.body.discount);
  const order = await Order.create({ ...req.body, totals, captain: req.user._id, restaurant: req.body.restaurant || req.user.restaurant, branch: req.body.branch || req.user.branch });
  if (order.table) await Table.findByIdAndUpdate(order.table, { status: 'occupied' });
  emitBranchEvent(order.branch, 'order:created', order);
  ok(res, order, 'Order created', 201);
});

export const updateOrder = asyncHandler(async (req, res) => {
  if (req.body.items) req.body.totals = calculateTotals(req.body.items, req.body.discount);
  const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  emitBranchEvent(order.branch, 'order:updated', order);
  ok(res, order, 'Order updated');
});

export const listOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ restaurant: req.user.restaurant, ...req.query }).populate('table captain').sort('-createdAt').limit(200);
  ok(res, orders);
});

export const sendKot = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  const kot = await KotOrder.create({
    restaurant: order.restaurant,
    branch: order.branch,
    order: order._id,
    kotNumber: `${Date.now()}`,
    items: order.items.map((item) => ({ name: item.name, quantity: item.quantity, notes: item.notes })),
    sentBy: req.user._id
  });
  order.status = 'kot_sent';
  await order.save();
  emitBranchEvent(order.branch, 'kot:created', kot);
  emitRestaurantEvent(order.restaurant, 'notification:new', { type: 'kot', message: `New KOT ${kot.kotNumber}` });
  ok(res, kot, 'KOT sent', 201);
});
