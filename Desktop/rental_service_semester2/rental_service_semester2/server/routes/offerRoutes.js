import express from 'express';
import upload from '../middleware/upload.js';
import { 
    getAllOffers, 
    getFullOffer, 
    createOffer,
    getFavoriteOffers,
    toggleFavorite
} from '../controllers/offerController.js';

const router = express.Router();

router.get('/', getAllOffers);

router.get('/favorite', getFavoriteOffers); 
router.post('/favorite/:offerId/:status', toggleFavorite); 

router.get('/:id', getFullOffer); 

router.post('/', upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos', maxCount: 6 }
]), createOffer);

export default router;