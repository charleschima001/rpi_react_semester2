import { Router } from 'express';
import upload from '../middleware/upload.js';
import { 
  registration, 
  login, 
  checkAuth, 
  logout,
  updateUserProfile 
} from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', upload.single('avatar'), registration);
router.post('/login', login);
router.get('/login', authenticateToken, checkAuth);
router.delete('/logout', logout);
router.put('/profile', authenticateToken, upload.single('avatar'), updateUserProfile);

export default router;