import { createAction } from '@reduxjs/toolkit';
import { CityOffer, OffersList } from '../types/offer';

export const changeCity = createAction('offers/changeCity', (city: CityOffer) => ({
  payload: city
}));

export const offersCityList = createAction('offers/offersCityList', (offers: OffersList[]) => ({
  payload: offers
}));