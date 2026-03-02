import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import api from '../services/api'; 

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

if (typeof window !== 'undefined') {
  (window as unknown as { store: typeof store }).store = store;
}

export type State = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;