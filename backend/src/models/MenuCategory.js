import mongoose from 'mongoose';
import { objectId } from './baseFields.js';

const menuCategorySchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: { type: mongoose.Schema.Types.ObjectId, ref: 'Branch', index: true },
  name: { type: String, required: true, trim: true },
  description: String,
  sortOrder: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const MenuCategory = mongoose.model('MenuCategory', menuCategorySchema);
