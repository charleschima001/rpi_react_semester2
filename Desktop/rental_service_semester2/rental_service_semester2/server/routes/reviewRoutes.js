import express from 'express';
import { addReview, getReviewsByOfferId } from '../controllers/reviewController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router({ mergeParams: true });

router.post('/:offerId', authenticateToken, addReview);

router.get('/:offerId', getReviewsByOfferId);

export default router;