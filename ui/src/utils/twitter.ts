import { AppDispatch } from '../store';
import { toggleUserLoading } from '../store/userReducer';

export const authorizeTwitter = async (dispatch: AppDispatch): Promise<void> => {
	dispatch(toggleUserLoading({ isLoading: true }));
	// Sync all the store
	dispatch(toggleUserLoading({ isLoading: false }));
};
