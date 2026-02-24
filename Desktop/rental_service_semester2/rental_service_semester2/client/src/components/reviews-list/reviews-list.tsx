import { Review } from '../../types/review';
import { Review as ReviewComponent } from '../review/review';

type ReviewsListProps = {
  reviews: Review[];
};

function ReviewsList({ reviews }: ReviewsListProps) {
  return (
    <section className="offer__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot; <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews.map((review) => (
          <ReviewComponent key={review.id} review={review} />
        ))}
      </ul>
    </section>
  );
}

export { ReviewsList };