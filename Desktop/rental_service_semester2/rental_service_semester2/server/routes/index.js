import express from 'express';
import userRoutes from './userRoutes.js';
import offerRoutes from './offerRoutes.js';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/offers', offerRoutes);

export default router;