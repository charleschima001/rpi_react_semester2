import { createReducer } from '@reduxjs/toolkit';
import { changeCity, offersCityList, requireAuthorization, setOffersDataLoadingStatus, setError, setUser } from './action';
import { fetchReviewsAction, postReviewAction, toggleFavoriteAction, fetchOfferAction } from './api-actions';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { AuthorizationStatus } from '../const';
import { UserData } from '../types/User-data';

type InitialState = {
  city: string;
  offers: Offer[];
  authorizationStatus: string;
  isOffersDataLoading: boolean;
  error: string | null;
  reviews: Record<string, Review[]>;
  user: UserData | null;
  // New state for single offer
  currentOffer: Offer | null;
  offerLoadingStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
};

const initialState: InitialState = {
  city: 'Paris',
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  isOffersDataLoading: false,
  error: null,
  reviews: {},
  user: null,
  // Initialize new state
  currentOffer: null,
  offerLoadingStatus: 'idle',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    // City selection
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })

    // Offers list
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })

    // Single offer
    .addCase(fetchOfferAction.pending, (state) => {
      state.offerLoadingStatus = 'loading';
      state.currentOffer = null;
    })
    .addCase(fetchOfferAction.fulfilled, (state, action) => {
      state.currentOffer = action.payload;
      state.offerLoadingStatus = 'succeeded';
    })
    .addCase(fetchOfferAction.rejected, (state) => {
      state.offerLoadingStatus = 'failed';
      state.currentOffer = null;
    })

    // Authorization
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUser, (state, action) => {
      state.user = action.payload;
    })

    // Loading state
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })

    // Error handling
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })

    // Favorites
    .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
      const { offerId, status } = action.meta.arg;
      
      // Update in offers array
      const offer = state.offers.find(o => o.id === offerId);
      if (offer) {
        offer.isFavorite = status === 1;
      }
      
      // Update in currentOffer if it matches
      if (state.currentOffer && state.currentOffer.id === offerId) {
        state.currentOffer.isFavorite = status === 1;
      }
    })

    // Reviews
    .addCase(fetchReviewsAction.fulfilled, (state, action) => {
      const offerId = action.meta.arg;
      state.reviews[offerId] = action.payload;
    })
    .addCase(postReviewAction.fulfilled, (state, action) => {
      const { offerId } = action.meta.arg;
      if (state.reviews[offerId]) {
        state.reviews[offerId] = [action.payload, ...state.reviews[offerId]];
      } else {
        state.reviews[offerId] = [action.payload];
      }
    });
});