import mongoose from 'mongoose';
import { moneyField, objectId } from './baseFields.js';

const inventorySchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: objectId('Branch'),
  itemName: { type: String, required: true, trim: true },
  unit: { type: String, required: true, enum: ['kg', 'g', 'l', 'ml', 'pcs', 'pack'] },
  currentStock: { type: Number, default: 0, min: 0 },
  reorderLevel: { type: Number, default: 0 },
  purchasePrice: moneyField,
  supplier: { name: String, phone: String },
  lastPurchasedAt: Date
}, { timestamps: true });

export const Inventory = mongoose.model('Inventory', inventorySchema);
