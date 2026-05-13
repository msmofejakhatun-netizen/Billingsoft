import mongoose from 'mongoose';
import { moneyField, objectId } from './baseFields.js';

const menuItemSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', index: true },
  category: objectId('MenuCategory'),
  name: { type: String, required: true, trim: true },
  sku: { type: String, trim: true },
  description: String,
  imageUrl: String,
  foodType: { type: String, enum: ['veg', 'non_veg', 'egg'], default: 'veg' },
  price: moneyField,
  gstRate: { type: Number, default: 5, min: 0 },
  preparationTimeMinutes: { type: Number, default: 10 },
  variants: [{ name: String, price: moneyField }],
  addOns: [{ name: String, price: moneyField }],
  isAvailable: { type: Boolean, default: true },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

menuItemSchema.index({ restaurant: 1, sku: 1 }, { unique: true, sparse: true });
export const MenuItem = mongoose.model('MenuItem', menuItemSchema);
