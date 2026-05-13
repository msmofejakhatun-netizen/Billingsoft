import { Router } from 'express';
import { createOrder, listOrders, sendKot, updateOrder } from '../controllers/orderController.js';
import { protect, authorize } from '../middleware/auth.js';
import { ROLES } from '../utils/roles.js';

const router = Router();
router.use(protect);
router.get('/', listOrders);
router.post('/', authorize(ROLES.MERCHANT, ROLES.CAPTAIN, ROLES.CASHIER), createOrder);
router.patch('/:id', authorize(ROLES.MERCHANT, ROLES.CAPTAIN, ROLES.CASHIER), updateOrder);
router.post('/:id/kot', authorize(ROLES.MERCHANT, ROLES.CAPTAIN, ROLES.CASHIER), sendKot);
export default router;
