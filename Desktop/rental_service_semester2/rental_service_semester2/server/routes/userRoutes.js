import express from 'express';
import upload from '../middleware/upload.js';
import { registration } from '../controllers/userController.js';

const router = express.Router();

router.post('/registration', upload.single('avatar'), registration);

export default router;