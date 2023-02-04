import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const initialState = {
	account: null,
	isConnected: false,
	isLoading: false,
} as {
	account: TwitterAccount | null,
	isConnected: boolean,
	isLoading: boolean,
};

export const nftsSlice = createSlice({
	name: 'twitter',
	initialState,
	reducers: {
		connectAccount: (
			state,
			action: PayloadAction<{ accountUser: string, twitterIdsFollowed: string[], }>,
		): void => {
			state.isConnected = true;
			state.account = {
				accountUser: action.payload.accountUser,
				isVerified: true,
				twitterIdsFollowed: action.payload.twitterIdsFollowed
			};
		},
		disconnectAccount: (state): void => {
			state.account = null;
			state.isConnected = false;
		},
		toggleLoading: (state,action: PayloadAction<{ isLoading: boolean }>, ): void => {
			state.isLoading = action.payload.isLoading;
		},
	},
});

export const { connectAccount, disconnectAccount, toggleLoading } = nftsSlice.actions;

export const selectAccount = (state: RootState) => state.twitter.account;
export const selectIsConnected = (state: RootState) => state.twitter.isConnected;
export const selectTwitterIsLoading = (state: RootState) => state.twitter.isLoading;

export default nftsSlice.reducer;
