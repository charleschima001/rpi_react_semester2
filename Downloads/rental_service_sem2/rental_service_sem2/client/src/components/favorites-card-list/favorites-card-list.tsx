import { OffersList } from "../../types/offer"
import { FavoritesCard } from "../favorites-card/favorites-card";

type FavoritesCardListProps = {
    offersList: OffersList[];
}

function FavoritesCardList({ offersList }: FavoritesCardListProps) {
    return (
        <div className="favorites__places">
            {Array.from(offersList, (item) =>
                <FavoritesCard key={item.id} id={item.id} title={item.title} type={item.type} price={item.price}
                    previewImage={item.previewImage} isPremium={item.isPremium} rating={item.rating} />
            )}
        </div>
    );
}

export { FavoritesCardList };