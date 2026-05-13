import mongoose from 'mongoose';
import { moneyField, objectId } from './baseFields.js';

const reportSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: objectId('Branch'),
  type: { type: String, enum: ['day_end', 'sales', 'inventory', 'tax'], required: true, index: true },
  periodStart: Date,
  periodEnd: Date,
  metrics: {
    orders: { type: Number, default: 0 },
    grossSales: moneyField,
    discounts: moneyField,
    taxes: moneyField,
    netSales: moneyField,
    expenses: moneyField
  },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const Report = mongoose.model('Report', reportSchema);
