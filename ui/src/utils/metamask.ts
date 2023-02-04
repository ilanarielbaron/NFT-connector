import { createUser, fetchRandomUUID, generateToken, getUserByAddress, verifyToken } from '../api/api';
import { AppDispatch } from '../store';
import { updateAnswers } from '../store/answersReducer';
import { disconnectAccount } from '../store/twitterReducer';
import { errorMessage, logoutUser } from '../store/userReducer';
import { disconnectWallet, signMessage, unSignMessage } from '../store/walletReducer';
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
			const token = localStorage.getItem('token');

			if(token) {
				await callAPI(dispatch, async()=> {
					const tokenVerified = await verifyToken(token);
		
					if(tokenVerified) {
						dispatch(signMessage());
					}
				});
			}
		}
	} catch (err) {
		dispatch(errorMessage({ message: 'There was a problem connecting to metamask' }));
	}
};

export const accountChanged = async (address: string, dispatch: AppDispatch): Promise<void> => {
	await callAPI(dispatch, async()=> {
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
			dispatch(unSignMessage());
			syncUser(user, dispatch);
		}
	});
};

export const chainChanged = (dispatch: AppDispatch): void => {
	disconnectAll(dispatch);
};

export const disconnectAll = (dispatch: AppDispatch): void => {
	dispatch(disconnectWallet());
	dispatch(logoutUser());
	dispatch(disconnectAccount());
	dispatch(updateAnswers({answers: []}));
};

//Sign the message with Metamask
export const signAccount = async(dispatch: AppDispatch, address: string): Promise<void> => {
	try {
		await callAPI(dispatch, async()=> {
			const uuid = await fetchRandomUUID();

			if(uuid) {
				const from = address;
				//@ts-expect-error out of typescript scope
				const signature = await window.ethereum.request({
					method: 'personal_sign',
					params: [uuid, from, 'Passw0rd'],
				});

				const token = await generateToken(signature);
				if(token) {
					localStorage.setItem('token', token);
					dispatch(signMessage());
				}
			}
		});
		
	} catch (err) {
		dispatch(errorMessage({ message: 'There was a problem signing the message' }));
	}
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
