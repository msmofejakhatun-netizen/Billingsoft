import { Router } from 'express';
import { createStaffUser, login, logout, me, register, registerRestaurant } from '../controllers/authController.js';
import { authorize, protect } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { createStaffSchema, loginSchema, registerSchema, restaurantRegisterSchema } from '../validators/authSchemas.js';
import { ROLES } from '../utils/roles.js';

const router = Router();
router.post('/register', validate(registerSchema), register);
router.post('/register-restaurant', validate(restaurantRegisterSchema), registerRestaurant);
router.post('/login', validate(loginSchema), login);
router.post('/staff', protect, authorize(ROLES.SUPER_ADMIN, ROLES.MERCHANT), validate(createStaffSchema), createStaffUser);
router.post('/logout', protect, logout);
router.get('/me', protect, me);
export default router;
