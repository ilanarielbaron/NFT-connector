import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const initialState = {
	account: null,
	isConnected: false,
	isLoading: false,
	twitterError: '',
} as {
	account: TwitterAccount | null,
	isConnected: boolean,
	isLoading: boolean,
	twitterError: string,
};

export const nftsSlice = createSlice({
	name: 'twitter',
	initialState,
	reducers: {
		connectAccount: (
			state,
			action: PayloadAction<{ accountUser: string, twitterIdsFollowed: string[], isVerified: boolean }>,
		): void => {
			state.isConnected = true;
			state.account = {
				accountUser: action.payload.accountUser,
				isVerified: action.payload.isVerified,
				twitterIdsFollowed: action.payload.twitterIdsFollowed
			};
		},
		disconnectAccount: (state): void => {
			state.account = null;
			state.isConnected = false;
		},
		setTwitterError: (state, action: PayloadAction<{ error: string }>): void => {
			state.twitterError = action.payload.error;
			state.account = null;
			state.isLoading = false;
			state.isConnected = false;
		},
		toggleLoading: (state,action: PayloadAction<{ isLoading: boolean }>, ): void => {
			state.isLoading = action.payload.isLoading;
		},
	},
});

export const { connectAccount, disconnectAccount, toggleLoading, setTwitterError } = nftsSlice.actions;

export const selectAccount = (state: RootState) => state.twitter.account;
export const selectIsConnected = (state: RootState) => state.twitter.isConnected;
export const selectTwitterIsLoading = (state: RootState) => state.twitter.isLoading;
export const selectTwitterError = (state: RootState) => state.twitter.twitterError;

export default nftsSlice.reducer;
