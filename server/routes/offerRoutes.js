import { Router } from 'express';
import upload from '../middleware/upload.js';
import { 
  createOffer, 
  getAllOffers, 
  getFullOffer,
  toggleFavorite,
  getFavoriteOffers 
} from '../controllers/offerController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/offers', getAllOffers);

router.get('/offers/:id', getFullOffer);

router.get('/favorite', authenticateToken, getFavoriteOffers);

router.post(
  '/offers', 
  authenticateToken,
  upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos', maxCount: 6 }
  ]),
  createOffer
);
router.post('/favorite/:offerId/:status', authenticateToken, toggleFavorite);

export default router;