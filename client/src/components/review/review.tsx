import { Review as ReviewType } from '../../types/review';
import { useState } from 'react';

type ReviewProps = {
  review: ReviewType;
};

function Review({ review }: ReviewProps) {
  const [imageError, setImageError] = useState(false);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const ratingPercent = Math.round(review.rating * 20);

  const getInitials = (name: string) => {
    return name?.charAt(0).toUpperCase() || '?';
  };

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper" style={{
          width: '54px',
          height: '54px',
          borderRadius: '50%',
          overflow: 'hidden',
          backgroundColor: '#e6e6e6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {review.user.avatarUrl && !imageError ? (
            <img 
              className="reviews__avatar user__avatar" 
              src={review.user.avatarUrl} 
              width="54" 
              height="54" 
              alt={`${review.user.name}'s avatar`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#9b9b9b',
              textTransform: 'uppercase'
            }}>
              {getInitials(review.user.name)}
            </div>
          )}
        </div>
        <span className="reviews__user-name">
          {review.user.name}
        </span>
        {review.user.isPro && (
          <span className="reviews__user-status">Pro</span>
        )}
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">
          {review.comment}
        </p>
        <time className="reviews__time" dateTime={review.date}>
          {formatDate(review.date)}
        </time>
      </div>
    </li>
  );
}

export { Review };