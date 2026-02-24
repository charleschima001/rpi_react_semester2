import { OffersList } from "../../types/offer"
import { CitiesCard } from "../cities-card/cities-card";

type CitiesCardListProps = {
    offersList: OffersList[];
    onCardMouseEnter: (id: string) => void;
    onCardMouseLeave: () => void;
};

function CitiesCardList({ offersList, onCardMouseEnter, onCardMouseLeave }: CitiesCardListProps) {
    return (
        <div className="cities__places-list places__list tabs__content">
            {offersList.map((item) =>
                <CitiesCard 
                    key={item.id} 
                    id={item.id} 
                    title={item.title} 
                    type={item.type} 
                    price={item.price}
                    previewImage={item.previewImage} 
                    isPremium={item.isPremium} 
                    rating={item.rating}
                    onCardMouseEnter={onCardMouseEnter}
                    onCardMouseLeave={onCardMouseLeave}
                />
            )}
        </div>
    );
}

export { CitiesCardList };