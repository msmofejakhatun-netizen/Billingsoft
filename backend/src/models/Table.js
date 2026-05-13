import mongoose from 'mongoose';
import { objectId } from './baseFields.js';

const tableSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: objectId('Branch'),
  name: { type: String, required: true, trim: true },
  capacity: { type: Number, default: 4, min: 1 },
  section: { type: String, default: 'Main' },
  qrCodeUrl: String,
  status: { type: String, enum: ['available', 'occupied', 'reserved', 'cleaning'], default: 'available', index: true },
  mergedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }]
}, { timestamps: true });

tableSchema.index({ branch: 1, name: 1 }, { unique: true });
export const Table = mongoose.model('Table', tableSchema);
