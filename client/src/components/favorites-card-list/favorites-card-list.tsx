import { Offer } from "../../types/offer";
import { FavoritesCard } from "../favorites-card/favorites-card";
import { useAppDispatch } from "../../hooks";
import { toggleFavoriteAction } from "../../store/api-actions";

type FavoritesCardListProps = {
    offersList: Offer[];
}

function FavoritesCardList({ offersList }: FavoritesCardListProps) {
    const dispatch = useAppDispatch();

    const handleFavoriteClick = (offerId: string, currentStatus: boolean) => {
        const newStatus = currentStatus ? 0 : 1;
        dispatch(toggleFavoriteAction({ offerId, status: newStatus }));
    };

    return (
        <div className="favorites__places">
            {offersList.map((item) =>
                <FavoritesCard 
                    key={item.id} 
                    id={item.id} 
                    title={item.title} 
                    type={item.type} 
                    price={item.price}
                    previewImage={item.previewImage} 
                    isPremium={item.isPremium} 
                    rating={item.rating}
                    isFavorite={item.isFavorite}
                    onFavoriteClick={handleFavoriteClick}
                />
            )}
        </div>
    );
}

export { FavoritesCardList };