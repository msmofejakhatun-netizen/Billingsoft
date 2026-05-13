import { z } from 'zod';
import { ALL_ROLES, ROLES } from '../utils/roles.js';

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid MongoDB ObjectId');
const email = z.string().trim().toLowerCase().email('Valid email is required');
const password = z.string().min(8, 'Password must be at least 8 characters').max(128, 'Password is too long');

export const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, 'Name is required').max(120),
    email,
    phone: z.string().trim().min(7).max(20).optional().or(z.literal('')),
    password,
    role: z.enum([ROLES.SUPER_ADMIN, ROLES.MERCHANT]).default(ROLES.MERCHANT),
    restaurant: objectId.optional(),
    branch: objectId.optional()
  })
});

export const createStaffSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(120),
    email,
    phone: z.string().trim().min(7).max(20).optional().or(z.literal('')),
    password,
    role: z.enum(ALL_ROLES.filter((role) => role !== ROLES.SUPER_ADMIN)),
    restaurant: objectId.optional(),
    branch: objectId.optional(),
    permissions: z.array(z.string().trim()).default([])
  })
});

export const restaurantRegisterSchema = z.object({
  body: z.object({
    ownerName: z.string().trim().min(2).max(120),
    email,
    phone: z.string().trim().min(7).max(20).optional().or(z.literal('')),
    password,
    restaurantName: z.string().trim().min(2).max(160),
    branchName: z.string().trim().min(2).max(120).optional(),
    gstin: z.string().trim().max(20).optional().or(z.literal(''))
  })
});

export const loginSchema = z.object({
  body: z.object({
    email,
    password: z.string().min(1, 'Password is required')
  })
});
