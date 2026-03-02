import { createAction } from '@reduxjs/toolkit';
import { Offer } from '../types/offer';
import { AuthorizationStatusType } from '../types/authorization-status';
import { UserData } from '../types/User-data';

export const setUser = createAction<UserData | null>('user/setUser');

export const changeCity = createAction<string>('offers/changeCity');
export const offersCityList = createAction<Offer[]>('offers/offersCityList');
export const requireAuthorization = createAction<AuthorizationStatusType>('user/requireAuthorization');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const setError = createAction<string | null>('data/setError');