import { errorMessage, toggleUserLoading } from '../store/userReducer';
import { disconnectWallet } from '../store/walletReducer';

const syncUser = async (
	user: User,
	dispatch: any,
): Promise<void> => {
	dispatch(toggleUserLoading({ isLoading: true }));
	// Sync all the store
	dispatch(toggleUserLoading({ isLoading: false }));
};

export const userIsConnected = async (dispatch: any): Promise<void> => {
	dispatch(toggleUserLoading({ isLoading: true }));
	try {
		//@ts-expect-error out of typescript scope
		const accounts = await window.ethereum.request({
			method: 'eth_accounts',
		});
		if (accounts?.length > 0) {
			// Fetch the user by address from the API
			// if (userConnected) {
			// 	syncUser(
			// 		userConnected,
			// 		dispatch,
			// 	);
			// }
		}
		dispatch(toggleUserLoading({ isLoading: false }));
	} catch (err) {
		dispatch(errorMessage({ message: 'There was a problem with the API' }));
	}
};

export const accountChanged = async (address: string, dispatch: any): Promise<void> => {
	dispatch(toggleUserLoading({ isLoading: true }));
	//@ts-expect-error out of typescript scope
	const chainId = window.ethereum.chainId;
	// Get the user from the DB by address
	//const existingUser = await getUserByAddress(address);

	// If there is a user created use it, if not just create a new one in out DB
	//let id = '';
	// if (!existingUser) {
	// 	id = await createUser(address, chainId);
	// } else {
	// 	id = existingUser.id;
	// 	await connectUser(existingUser.id);
	// }
	dispatch(toggleUserLoading({ isLoading: false }));
	//syncUser({ address, chainId, nftsLiked, id }, dispatch);
};

export const chainChanged = (dispatch: any): void => {
	dispatch(disconnectWallet());
	// Reset the rest of the store
};

//Sign the message with Metamask
export const signAccount = (dispatch: any): void => {
	return;
};

export const connectHandler = async (dispatch: any): Promise<void> => {
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
