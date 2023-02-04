import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './';

export const initialState = {
	wallet: null,
	isConnected: false,
	isLoading: false,
} as {
	wallet: Wallet | null,
	isConnected: boolean,
	isLoading: boolean,
};

const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		connectWallet: (
			state,
			action: PayloadAction<{ address: string }>,
		): void => {
			state.isConnected = true;
			state.wallet = {
				address: action.payload.address,
				messageSigned: false,
			};
		},
		disconnectWallet: (state): void => {
			state.wallet = null;
			state.isConnected = false;
		},
		toggleLoading: (state,action: PayloadAction<{ isLoading: boolean }>, ): void => {
			state.isLoading = action.payload.isLoading;
		},
		signMessage: (
			state,
		): void => {
			state.wallet = {
				...state.wallet as Wallet,
				messageSigned: true,
			};
		},
		unSignMessage: (
			state,
		): void => {
			state.wallet = {
				...state.wallet as Wallet,
				messageSigned: false,
			};
		},
	},
});

export const { connectWallet, disconnectWallet, signMessage, toggleLoading, unSignMessage } = walletSlice.actions;

export const selectWallet = (state: RootState) => state.wallet.wallet;
export const selectWalletIsConnected = (state: RootState) => state.wallet.isConnected;
export const selectWalletIsLoading = (state: RootState) => state.wallet.isLoading;

export default walletSlice.reducer;
