import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '.';

export const initialState = {
	 isLoading: false,
	 isRegistered: false,
	 errorMessage: undefined as string | undefined,
};

const userSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		errorMessage: (state, action: PayloadAction<{ message?: string }>): void => {
			state.errorMessage = action.payload.message;
			state.isLoading = false;
		},
		toggleUserLoading: (state, action: PayloadAction<{ isLoading: boolean }>): void => {
			state.isLoading = action.payload.isLoading;
			state.errorMessage = undefined;
		},
		registerUser: (state): void => {
			state.isRegistered = true;
			state.errorMessage = undefined;
		},
		logoutUser: (state): void => {
			state.isRegistered = false;
			state.errorMessage = undefined;
		},
	},
});

export const { errorMessage, toggleUserLoading, registerUser, logoutUser } = userSlice.actions;

export const selectUserIsLoading = (state: RootState) => state.user.isLoading;
export const selectUserIsRegistered = (state: RootState) => state.user.isRegistered;
export const selectErrorMessage = (state: RootState) => state.user.errorMessage;

export default userSlice.reducer;
