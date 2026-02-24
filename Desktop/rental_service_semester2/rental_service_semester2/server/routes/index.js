import { Router } from 'express';
import offerRouter from './offerRoutes.js';
import userRoutes from './userRoutes.js';
import reviewRouter from './reviewRoutes.js';

const router = new Router();

router.use('/offers', offerRouter); 
router.use('/users', userRoutes); 
router.use('/reviews', reviewRouter); 

export { router };