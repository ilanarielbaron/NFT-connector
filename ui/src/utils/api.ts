import { AppDispatch } from '../store';
import { toggleUserLoading } from '../store/userReducer';

//call API high order function
export const callAPI = async(dispatch: AppDispatch, action: () => Promise<void>) => {
	dispatch(toggleUserLoading({ isLoading: true }));
	await action();
	dispatch(toggleUserLoading({ isLoading: false }));
};
