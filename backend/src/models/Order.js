import mongoose from 'mongoose';
import { moneyField, objectId } from './baseFields.js';

const orderItemSchema = new mongoose.Schema({
  menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
  name: String,
  quantity: { type: Number, required: true, min: 1 },
  price: moneyField,
  gstRate: { type: Number, default: 0 },
  notes: String,
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'served', 'cancelled'], default: 'pending' }
}, { _id: true });

const orderSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: objectId('Branch'),
  table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table', index: true },
  captain: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  customer: { name: String, phone: String, email: String },
  orderType: { type: String, enum: ['dine_in', 'takeaway', 'delivery', 'qr'], default: 'dine_in' },
  status: { type: String, enum: ['running', 'kot_sent', 'billed', 'paid', 'cancelled'], default: 'running', index: true },
  items: [orderItemSchema],
  totals: {
    subtotal: moneyField,
    discount: moneyField,
    cgst: moneyField,
    sgst: moneyField,
    serviceCharge: moneyField,
    grandTotal: moneyField
  },
  notes: String
}, { timestamps: true });

export const Order = mongoose.model('Order', orderSchema);
