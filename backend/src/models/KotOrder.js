import mongoose from 'mongoose';
import { objectId } from './baseFields.js';

const kotOrderSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  branch: objectId('Branch'),
  order: objectId('Order'),
  kotNumber: { type: String, required: true, index: true },
  items: [{ name: String, quantity: Number, notes: String, status: { type: String, enum: ['pending', 'preparing', 'ready', 'completed'], default: 'pending' } }],
  status: { type: String, enum: ['pending', 'preparing', 'ready', 'completed'], default: 'pending', index: true },
  sentBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export const KotOrder = mongoose.model('KotOrder', kotOrderSchema);
