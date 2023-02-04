import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer';
import twitterReducer from './twitterReducer';
import walletReducer from './walletReducer';
import answersReducer from './answersReducer';

export const store = configureStore({
	reducer: {
		wallet: walletReducer,
		twitter: twitterReducer,
		user: userReducer,
		answers: answersReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
