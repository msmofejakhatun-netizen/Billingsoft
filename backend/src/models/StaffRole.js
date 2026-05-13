import mongoose from 'mongoose';
import { ALL_ROLES } from '../utils/roles.js';
import { objectId } from './baseFields.js';

const staffRoleSchema = new mongoose.Schema({
  restaurant: objectId('Restaurant'),
  name: { type: String, required: true },
  baseRole: { type: String, enum: ALL_ROLES, required: true },
  permissions: [{ type: String }],
  isSystem: { type: Boolean, default: false }
}, { timestamps: true });

export const StaffRole = mongoose.model('StaffRole', staffRoleSchema);
