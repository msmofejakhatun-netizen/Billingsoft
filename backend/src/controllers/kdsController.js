import { KotOrder } from '../models/KotOrder.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ok } from '../utils/apiResponse.js';
import { emitBranchEvent } from '../sockets/index.js';

export const updateKotStatus = asyncHandler(async (req, res) => {
  const kot = await KotOrder.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
  emitBranchEvent(kot.branch, 'kot:status', kot);
  ok(res, kot, 'KOT status updated');
});
