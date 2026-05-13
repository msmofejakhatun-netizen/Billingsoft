import mongoose from 'mongoose';
import { objectId } from './baseFields.js';

const printerSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: objectId('Branch'),
  name: { type: String, required: true },
  type: { type: String, enum: ['thermal_58mm', 'thermal_80mm', 'network', 'bluetooth'], default: 'thermal_80mm' },
  target: { type: String, enum: ['invoice', 'kot', 'bar', 'parcel'], default: 'invoice' },
  connection: { ip: String, port: Number, vendorId: String, productId: String },
  isDefault: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export const Printer = mongoose.model('Printer', printerSchema);
