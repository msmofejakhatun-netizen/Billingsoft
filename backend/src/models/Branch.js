import mongoose from 'mongoose';
import { objectId } from './baseFields.js';

const branchSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, trim: true, uppercase: true },
  phone: String,
  address: {
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    country: { type: String, default: 'India' }
  },
  businessHours: [{ day: String, opensAt: String, closesAt: String, isClosed: { type: Boolean, default: false } }],
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

branchSchema.index({ restaurant: 1, code: 1 }, { unique: true });
export const Branch = mongoose.model('Branch', branchSchema);
