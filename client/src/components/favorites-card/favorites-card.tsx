import { useState } from "react";
import { AppRoute } from "../../const";
import { Link } from "react-router-dom";

type FavoritesCardProps = {
    id: string;
    title: string;
    type: string;
    price: number;
    isPremium: boolean;
    previewImage: string;
    rating: number;
    isFavorite: boolean;
    onFavoriteClick: (offerId: string, currentStatus: boolean) => void;
}

function FavoritesCard({ 
    id, 
    title, 
    type, 
    price, 
    previewImage, 
    isPremium, 
    rating, 
    isFavorite,
    onFavoriteClick 
}: FavoritesCardProps) {
    const ratingPercent = Math.round(rating * 20);

    const handleBookmarkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onFavoriteClick(id, isFavorite);
    };

    return (
        <article className="favorites__card place-card">
            {isPremium && (
                <div className="place-card__mark">
                    <span>Premium</span>
                </div>
            )}
            <div className="favorites__image-wrapper place-card__image-wrapper">
                <Link to={`${AppRoute.Offer}/${id}`}>
                    <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place image" />
                </Link>
            </div>
            <div className="favorites__card-info place-card__info">
                <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                        <b className="place-card__price-value">&euro;{price}</b>
                        <span className="place-card__price-text">&#47;&nbsp;night</span>
                    </div>
                    <button 
                        className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} 
                        type="button"
                        onClick={handleBookmarkClick}
                    >
                        <svg className="place-card__bookmark-icon" width="18" height="19">
                            <use href="#icon-bookmark"></use>
                        </svg>
                        <span className="visually-hidden">
                            {isFavorite ? 'In bookmarks' : 'To bookmarks'}
                        </span>
                    </button>
                </div>
                <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                        <span style={{ width: `${ratingPercent}%` }}></span>
                        <span className="visually-hidden">Rating</span>
                    </div>
                </div>
                <h2 className="place-card__name">
                    <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
                </h2>
                <p className="place-card__type">{type}</p>
            </div>
        </article>
    );
}

export { FavoritesCard };