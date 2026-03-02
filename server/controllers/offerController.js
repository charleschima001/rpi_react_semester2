import {Offer} from "../models/offer.js";
import {User} from "../models/user.js";
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js';

export async function getAllOffers(req, res, next) {
    try {
        const offers = await Offer.findAll({
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'avatar', 'userType']
            }]
        });
        
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    } catch (error) {
        console.error("Get all offers error:", error);
        next(ApiError.internal('Не удалось получить список предложений'));
    }
}

export const getFavoriteOffers = async (req, res, next) => {
  try {
    const favoriteOffers = await Offer.findAll({
      where: { isFavorite: true },
      include: [{
        model: User,
        as: 'author',
        attributes: ['id', 'username', 'avatar', 'userType']
      }]
    });
    const adaptedOffers = favoriteOffers.map(adaptOfferToClient);
    res.status(200).json(adaptedOffers);
  } catch (error) {
    console.error("Get favorite offers error:", error);
    next(ApiError.internal('Ошибка при получении избранных предложений'));
  }
};

export async function getFullOffer(req, res, next) {
    try {
        const { id } = req.params;

        const offer = await Offer.findByPk(id, {
            include: { 
                model: User, 
                as: 'author',
                attributes: ['id', 'username', 'avatar', 'userType']
            }
        });

        if (!offer) {
            return next(ApiError.badRequest('Offer not found'));
        }

        const fullOffer = adaptFullOfferToClient(offer);
        res.status(200).json(fullOffer);
    } catch (error) {
        console.error("Get full offer error:", error);
        next(ApiError.internal('Не удалось получить предложение: ' + error.message));
    }
}

export async function createOffer(req, res, next) {
    try {
        const userId = req.user?.id;
        
        if (!userId) {
            return next(ApiError.unauthorized('Пользователь не авторизован'));
        }

        const {
            title, description, publishDate, city,
            isPremium, isFavorite, rating, type, rooms, guests, price,
            features, commentsCount, latitude, longitude
        } = req.body;

        if (!title || !description || !city || !type || !rooms || !guests || !price) {
            return next(ApiError.badRequest('Отсутствуют обязательные поля'));
        }

        if (!req.files?.previewImage || req.files.previewImage.length === 0) {
            return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
        }

        const previewImagePath = `/static/${req.files.previewImage[0].filename}`;

        let processedPhotos = [];
        if (req.files?.photos) {
            processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
        }

        let parsedFeatures = [];
        if (features) {
            try {
                parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
            } catch {
                parsedFeatures = features.split(',');
            }
        }

        const offer = await Offer.create({
            title,
            description,
            publishDate: publishDate || new Date(),
            city,
            previewImage: previewImagePath,
            photos: processedPhotos,
            isPremium: isPremium === 'true',
            isFavorite: isFavorite === 'true',
            rating: parseFloat(rating) || 0,
            type,
            rooms: parseInt(rooms),
            guests: parseInt(guests),
            price: parseInt(price),
            features: parsedFeatures,
            commentsCount: parseInt(commentsCount) || 0,
            latitude: parseFloat(latitude) || 0,
            longitude: parseFloat(longitude) || 0,
            authorId: userId
        });

        const createdOfferWithAuthor = await Offer.findByPk(offer.id, {
            include: [{
                model: User,
                as: 'author',
                attributes: ['id', 'username', 'avatar', 'userType']
            }]
        });

        return res.status(201).json(adaptOfferToClient(createdOfferWithAuthor));
    } catch (error) {
        console.error("Create offer error:", error);
        next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
    }
}

export const toggleFavorite = async (req, res, next) => {
  try {
    const { offerId, status } = req.params;
    const userId = req.user?.id;
    
    const offer = await Offer.findByPk(offerId);
    if (!offer) {
      return next(ApiError.notFound('Предложение не найдено'));
    }
    
    offer.isFavorite = status === '1';
    await offer.save();
    
    const updatedOffer = await Offer.findByPk(offerId, {
        include: [{
            model: User,
            as: 'author',
            attributes: ['id', 'username', 'avatar', 'userType']
        }]
    });
    
    res.json(adaptOfferToClient(updatedOffer));
  } catch (error) {
    console.error("Toggle favorite error:", error);
    next(ApiError.internal('Ошибка при обновлении статуса избранного'));
  }
};