import { Router } from 'express';
import { login, me, registerRestaurant } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = Router();
router.post('/register-restaurant', registerRestaurant);
router.post('/login', login);
router.get('/me', protect, me);
export default router;
