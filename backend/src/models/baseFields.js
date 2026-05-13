import mongoose from 'mongoose';

export const objectId = (ref, required = true) => ({ type: mongoose.Schema.Types.ObjectId, ref, required, index: true });

export const moneyField = { type: Number, min: 0, default: 0 };
