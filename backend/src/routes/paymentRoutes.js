import { Router } from 'express';
import { createPayment } from '../controllers/paymentController.js';
import { protect, authorize } from '../middleware/auth.js';
import { ROLES } from '../utils/roles.js';

const router = Router();
router.use(protect);
router.post('/', authorize(ROLES.MERCHANT, ROLES.CASHIER), createPayment);
export default router;
