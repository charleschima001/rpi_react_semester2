import { Offer } from '../types/offer';
import { SortOffersType } from '../const';

export type SortType = keyof typeof SortOffersType;

export const sortOffers = (offers: Offer[], sortType: SortType): Offer[] => {
  const sortedOffers = [...offers];
  
  switch (sortType) {
    case 'PriceToHigh':
      return sortedOffers.sort((a, b) => a.price - b.price);
    
    case 'PriceToLow':
      return sortedOffers.sort((a, b) => b.price - a.price);
    
    case 'TopRated':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    
    case 'Popular':
    default:
      return sortedOffers; 
  }
};