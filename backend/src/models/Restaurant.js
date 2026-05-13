import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  legalName: { type: String, trim: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  gstin: { type: String, trim: true, uppercase: true },
  fssai: { type: String, trim: true },
  logoUrl: String,
  subscription: {
    plan: { type: String, enum: ['trial', 'starter', 'growth', 'enterprise'], default: 'trial' },
    status: { type: String, enum: ['active', 'past_due', 'cancelled'], default: 'active' },
    validUntil: Date
  },
  settings: {
    currency: { type: String, default: 'INR' },
    taxInclusive: { type: Boolean, default: false },
    kotPrefix: { type: String, default: 'KOT' },
    invoicePrefix: { type: String, default: 'INV' }
  },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
