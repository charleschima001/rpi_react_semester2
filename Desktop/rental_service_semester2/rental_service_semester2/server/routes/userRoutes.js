import { Router } from 'express';
import upload from '../middleware/upload.js';
import { registration, login, checkAuth, logout } from "../controllers/userController.js";
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = new Router();

router.post('/registration', upload.single('avatar'), registration);
router.post('/login', login);

router.get('/me', authenticateToken, checkAuth);
router.delete('/logout', authenticateToken, logout); 

export default router;