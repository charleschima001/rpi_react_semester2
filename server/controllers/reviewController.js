import { Review } from '../models/review.js';
import { User } from '../models/user.js';
import ApiError from '../error/ApiError.js';
import { adaptReviewToClient } from '../adapters/reviewAdapter.js';

export const addReview = async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    const { offerId } = req.params;
    const userId = req.user.id;

    if (!comment || !rating) {
      return next(ApiError.badRequest('Comment and rating are required'));
    }

    const review = await Review.create({
      text: comment,
      rating,
      publishDate: new Date(),
      authorId: userId,
      offerId
    });

    const reviewWithAuthor = await Review.findByPk(review.id, {
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'avatar', 'userType']
      }]
    });

    res.status(201).json(adaptReviewToClient(reviewWithAuthor));
  } catch (error) {
    console.error('Error adding review:', error);
    next(ApiError.internal('Error adding review: ' + error.message));
  }
};

export const getReviewsByOfferId = async (req, res, next) => {
  try {
    const { offerId } = req.params;

    const reviews = await Review.findAll({
      where: { offerId },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'avatar', 'userType']
      }],
      order: [['publishDate', 'DESC']]
    });

    const adaptedReviews = reviews.map(adaptReviewToClient);
    res.json(adaptedReviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    next(ApiError.internal('Error fetching reviews: ' + error.message));
  }
};