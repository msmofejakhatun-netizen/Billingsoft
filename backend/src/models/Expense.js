import mongoose from 'mongoose';
import { moneyField, objectId } from './baseFields.js';

const expenseSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: objectId('Branch'),
  category: { type: String, required: true, trim: true },
  amount: moneyField,
  note: String,
  billUrl: String,
  spentAt: { type: Date, default: Date.now },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Expense = mongoose.model('Expense', expenseSchema);
