import { OffersList } from '../../types/offer';
import { NearPlacesCard } from '../near-places-card/near-places-card';

type NearPlacesListProps = {
  offers: OffersList[];
  onCardMouseEnter?: (id: string) => void;
  onCardMouseLeave?: () => void;
};

function NearPlacesList({ offers, onCardMouseEnter, onCardMouseLeave }: NearPlacesListProps) {
  return (
    <section className="near-places places">
      <h2 className="near-places__title">Other places in the neighbourhood</h2>
      <div className="near-places__list places__list">
        {offers.map((offer) => (
          <NearPlacesCard 
            key={offer.id} 
            offer={offer}
            onCardMouseEnter={onCardMouseEnter}
            onCardMouseLeave={onCardMouseLeave}
          />
        ))}
      </div>
    </section>
  );
}

export { NearPlacesList };