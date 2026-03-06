import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { Offer } from '../types/offer';
import { Review } from '../types/review';
import { offersCityList, requireAuthorization, setOffersDataLoadingStatus, setError, setUser } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus } from '../const';
import { AuthData, UserData } from '../types/User-data';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    try {
      const { data } = await api.get<Offer[]>(APIRoute.Offers);
      dispatch(offersCityList(data));
    } catch (error) {
      console.error('Failed to fetch offers:', error);
    } finally {
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

// NEW: Fetch single offer by ID
export const fetchOfferAction = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'offer/fetchOffer',
  async (offerId, { extra: api, rejectWithValue }) => {
    try {
      const { data } = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
      return data;
    } catch (error) {
      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { status?: number } };
        if (err.response?.status === 404) {
          return rejectWithValue('Offer not found');
        }
      }
      return rejectWithValue('Failed to fetch offer');
    }
  }
);

export const fetchReviewsAction = createAsyncThunk<Review[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/fetchReviews',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<Review[]>(`${APIRoute.Reviews}/${offerId}`);
    return data;
  },
);

export const postReviewAction = createAsyncThunk<Review, { offerId: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/postReview',
  async ({ offerId, comment, rating }, { extra: api }) => {
    const { data } = await api.post<Review>(`${APIRoute.Reviews}/${offerId}`, { 
      comment, 
      rating 
    });
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const response = await api.get(APIRoute.Login);
      const data = response.data;
      
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      
      if (data.user) {
        dispatch(setUser(data.user));
      } else {
        dispatch(setUser(data));
      }
    } catch {
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUser(null)); 
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
  rejectValue: string;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api, rejectWithValue }) => {
    try {
      const response = await api.post(APIRoute.Login, { email, password });
      const data = response.data;
      
      saveToken(data.token);
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      
      if (data.user) {
        dispatch(setUser(data.user));
      } else {
        dispatch(setUser(data));
      }
      
      return data;
    } catch (error) {

      if (error && typeof error === 'object' && 'response' in error) {
        const err = error as { response?: { status?: number } };
        if (err.response?.status === 401) {
          return rejectWithValue('Invalid email or password');
        }
      }
      return rejectWithValue('Login failed. Please try again.');
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    dispatch(setUser(null));
  },
);

export const clearErrorAction = createAsyncThunk(
  'clearError',
  (_arg, { dispatch }) => {
    setTimeout(() => {
      dispatch(setError(null));
    }, 2000);
  },
);

export const toggleFavoriteAction = createAsyncThunk<void, { offerId: string; status: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/toggle',
  async ({ offerId, status }, { extra: api }) => {
    await api.post(`${APIRoute.Favorite}/${offerId}/${status}`);
  }
);

export const updateUserAction = createAsyncThunk<UserData, FormData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/update',
  async (formData, { extra: api }) => {
    const { data } = await api.put<UserData>('/user/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return data;
  }
);