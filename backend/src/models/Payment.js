import mongoose from 'mongoose';
import { moneyField, objectId } from './baseFields.js';

const paymentSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: objectId('Branch'),
  order: objectId('Order'),
  invoiceNumber: { type: String, required: true, index: true },
  method: { type: String, enum: ['cash', 'card', 'upi', 'wallet', 'split'], required: true },
  amount: moneyField,
  discount: moneyField,
  gst: { cgst: moneyField, sgst: moneyField, igst: moneyField },
  transactionRef: String,
  paidAt: { type: Date, default: Date.now },
  cashier: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Payment = mongoose.model('Payment', paymentSchema);
