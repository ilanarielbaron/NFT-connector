import { getUserByAddress } from '../api/api';
import { AppDispatch } from '../store';
import { updateAnswers } from '../store/answersReducer';
import { connectAccount, disconnectAccount } from '../store/twitterReducer';
import { logoutUser, registerUser } from '../store/userReducer';
import { connectWallet } from '../store/walletReducer';
import { callAPI } from './api';

// Syncronize store state with the DB user
export const syncUser = async (
	user: User,
	dispatch: AppDispatch,
): Promise<void> => {
	dispatch(connectWallet({address: user.publicAddress}));
	if(user.twitterUser) {
		dispatch(connectAccount({accountUser: user.twitterUser, twitterIdsFollowed: user.twitterFollowed ?? [], isVerified: user.twitterVerified ?? false}));
	} else {
		dispatch(disconnectAccount());
	}
	if(user.answers) {
		dispatch(updateAnswers({answers: user.answers}));
	} else {
		dispatch(updateAnswers({answers: []}));
	}
	if(user.isRegistered) {
		dispatch(registerUser());
	} else {
		dispatch(logoutUser());
	}
};

export const connectUser = async (dispatch: AppDispatch, address: string): Promise<void> => {
	await callAPI(dispatch, async()=> {
		const user = await getUserByAddress(address);
		if (user) {
			syncUser(
				user,
				dispatch,
			);
		}
	});
};
