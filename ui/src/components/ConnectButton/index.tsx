import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { connectHandler, signAccount } from '../../utils/metamask';
import { selectWalletIsLoading } from '../../store/walletReducer';

export const ConnectButton = () => {
	const dispatch = useAppDispatch();
	const isConnected = useAppSelector(selectWalletIsConnected);
	const isLoading = useAppSelector(selectWalletIsLoading);
	const wallet = useAppSelector(selectWallet);

	const onClick = async(): Promise<void> => {
		if(!isConnected) {
			await connectHandler(dispatch);

			return;
		}

		if(isConnected && !wallet?.messageSigned && wallet?.address) {
			signAccount(dispatch, wallet.address);
		}
	};

	return (
		<Button
			disabled={isLoading}
			variant='outlined'
			sx={{ my: 1, mx: 1.5 }}
			onClick={onClick}
		>
			{isLoading ? 'loading' : isConnected ? (wallet?.messageSigned ? wallet?.address : 'Sign') : 'Connect'}
		</Button>
	);
};
