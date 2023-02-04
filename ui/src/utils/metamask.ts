import { createUser, getUserByAddress } from '../api/api';
import { AppDispatch } from '../store';
import { updateAnswers } from '../store/answersReducer';
import { disconnectAccount } from '../store/twitterReducer';
import { errorMessage, logoutUser } from '../store/userReducer';
import { disconnectWallet } from '../store/walletReducer';
import { callAPI } from './api';
import { connectUser, syncUser } from './user';


export const userIsConnected = async (dispatch: AppDispatch): Promise<void> => {
	try {
		//@ts-expect-error out of typescript scope
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});
		if (accounts?.length > 0) {
			connectUser(dispatch, accounts[0]);
		}
	} catch (err) {
		dispatch(errorMessage({ message: 'There was a problem connecting to metamask' }));
	}
};

export const accountChanged = async (address: string, dispatch: AppDispatch): Promise<void> => {
	await callAPI(dispatch, async()=> {
		console.log(address);
		if(!address) {
			disconnectAll(dispatch);

			return;
		}
		// Get the user from the DB by address
		let user = await getUserByAddress(address);

		if (!user) {
			user = await createUser(address);
		}

		if(user) {
			syncUser(user, dispatch);
		}
	});
};

export const chainChanged = (dispatch: AppDispatch): void => {
	disconnectAll(dispatch);
	// Reset the rest of the store
};

export const disconnectAll = (dispatch: AppDispatch): void => {
	dispatch(disconnectWallet());
	dispatch(logoutUser());
	dispatch(disconnectAccount());
	dispatch(updateAnswers({answers: []}));
};

//Sign the message with Metamask
export const signAccount = (dispatch: AppDispatch): void => {
	return;
};

export const connectHandler = async (dispatch: AppDispatch): Promise<void> => {
	//@ts-expect-error out of typescript scope
	if (window.ethereum) {
		try {
			//@ts-expect-error out of typescript scope
			const res = await window.ethereum.request({
				method: 'eth_requestAccounts',
			});
			await accountChanged(res[0], dispatch);
		} catch (err) {
			dispatch(errorMessage({ message: 'There was a problem connecting to MetaMask' }));
		}
	} else {
		dispatch(errorMessage({ message: 'Please install MetaMask' }));
	}
};
