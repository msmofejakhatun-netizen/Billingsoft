import { Router } from 'express';
import { dayEndReport } from '../controllers/reportController.js';
import { analytics } from '../controllers/dashboardController.js';
import { protect, authorize } from '../middleware/auth.js';
import { ROLES } from '../utils/roles.js';

const router = Router();
router.use(protect, authorize(ROLES.SUPER_ADMIN, ROLES.MERCHANT, ROLES.CASHIER));
router.get('/analytics', analytics);
router.post('/day-end', dayEndReport);
export default router;
