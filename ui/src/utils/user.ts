import { getUserByAddress, updateUser, verifyToken } from '../api/api';
import { AppDispatch } from '../store';
import {
	connectAccount,
	disconnectAccount,
	toggleLoading,
} from '../store/twitterReducer';
import { errorMessage, logoutUser, registerUser } from '../store/userReducer';
import { connectWallet, signMessage } from '../store/walletReducer';
import { callAPI } from './api';
import { fetchTwitterAccount } from './twitter';

// Syncronize store state with the DB user
export const syncUser = async (
	user: User,
	dispatch: AppDispatch
): Promise<void> => {
	dispatch(connectWallet({ address: user.publicAddress }));
	if (user.twitterUser) {
		dispatch(
			connectAccount({
				accountUser: user.twitterUser,
				twitterIdsFollowed: user.twitterFollowed ?? [],
				isVerified: user.twitterVerified ?? false,
			})
		);
	} else {
		dispatch(disconnectAccount());
	}
	if (user.isRegistered) {
		dispatch(registerUser());
	} else {
		dispatch(logoutUser());
	}
};

//Connect the user when the app init
export const connectUserOnAppInit = async (
	dispatch: AppDispatch,
	address: string,
	token: string | null,
	twitterCode: string | null
): Promise<void> => {
	await callAPI(dispatch, async () => {
		const user = await getUserByAddress(address);
		if (user) {
			await syncUser(user, dispatch);

			// If the user didn't registered and there is a token, then verify the token and sign the message
			if (token && !user.isRegistered) {
				const tokenVerified = await verifyToken(token);
				if (tokenVerified) {
					dispatch(signMessage());
				}
			}

			// If the user didn't pass to the next step yet and there is a twitter code in the URL, then proceed to twitter verification
			if (twitterCode && !user.isRegistered && !user.twitterVerified) {
				const twitterUpdate = await fetchTwitterAccount(dispatch, twitterCode, user);
				if (twitterUpdate) {
					dispatch(toggleLoading({isLoading: true}));
					await updateUser({
						...user,
						twitterUser: twitterUpdate.accountUser,
						twitterVerified: twitterUpdate.isVerified,
						twitterFollowed: twitterUpdate.twitterIdsFollowed,
					});
					dispatch(toggleLoading({isLoading: false}));
				}
			}
		}
	});
};

export const userIsConnected = async (
	dispatch: AppDispatch,
	twitterCode: string | null
): Promise<void> => {
	try {
		//@ts-expect-error out of typescript scope
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});
		if (accounts?.length > 0) {
			const token = localStorage.getItem('token');
			await connectUserOnAppInit(dispatch, accounts[0], token, twitterCode);
		}
	} catch (err) {
		dispatch(
			errorMessage({ message: 'There was a problem connecting to metamask' })
		);
	}
};
