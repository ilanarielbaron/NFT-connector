import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { connectHandler } from '../../utils/metamask';
import { selectWalletIsLoading } from '../../store/walletReducer';

export const ConnectButton = () => {
	const dispatch = useAppDispatch();
	const isConnected = useAppSelector(selectWalletIsConnected);
	const isLoading = useAppSelector(selectWalletIsLoading);
	const wallet = useAppSelector(selectWallet);

	return (
		<Button
			disabled={isLoading}
			variant='outlined'
			sx={{ my: 1, mx: 1.5 }}
			onClick={async (): Promise<void> => { !isConnected && await connectHandler(dispatch); }
			}
		>
			{isLoading ? 'loading' : isConnected ? wallet?.address : 'Connect'}
		</Button>
	);
};
