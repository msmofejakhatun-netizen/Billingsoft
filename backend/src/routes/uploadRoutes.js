import { Router } from 'express';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';
import { ok } from '../utils/apiResponse.js';

const router = Router();
router.post('/', protect, upload.single('file'), (req, res) => ok(res, { url: `/uploads/${req.file.filename}` }, 'File uploaded', 201));
export default router;
