import { adaptReviewToClient } from "../adapters/reviewAdapter.js";
import { Review } from "../models/review.js";
import { User } from "../models/user.js";
import ApiError from "../error/ApiError.js";

export const addReview = async (req, res, next) => {
  try {
    const { comment, rating } = req.body;
    const offerId = req.params.offerId;
    const userId = 1; 

    if (!comment || !rating || !offerId) {
      return next(ApiError.badRequest('Не хватает данных для комментария'));
    }

    const review = await Review.create({
      text: comment,
      rating,
      authorId: userId,
      offerId: offerId
    });

    const reviewWithAuthor = await Review.findByPk(review.id, {
      include: [{ model: User, as: 'author' }]
    });

    res.status(201).json(adaptReviewToClient(reviewWithAuthor));
  } catch (error) {
    console.error('Add review error:', error);
    next(ApiError.badRequest('Ошибка при добавлении комментария'));
  }
};
export const getReviewsByOfferId = async (req, res, next) => {
  try {
    const { offerId } = req.params;

    const reviews = await Review.findAll({
      where: { offerId: offerId },
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
    console.error('Get reviews error:', error);
    next(ApiError.internal('Ошибка при получении комментариев'));
  }
};