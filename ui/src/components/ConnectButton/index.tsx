import { Button } from '@mui/material';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectWallet, selectWalletIsConnected } from '../../store/walletReducer';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { connectHandler, signAccount } from '../../utils/metamask';
import { selectWalletIsLoading } from '../../store/walletReducer';
import  actionArrow  from './action-arrow.svg';

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
			variant='text'
			sx={{ color: 'white', fontSize:'24px', fontWeight:'400', p:0 }}
			onClick={onClick}
		>
			{isLoading ? 'loading' : isConnected ? (wallet?.messageSigned ? wallet?.address : 'Sign') : 'Connect'}	
			
			{!isLoading &&
				<img src={actionArrow} alt="Action arrow" style={{marginLeft:'15px'}}/>
			}
		</Button>
	);
};
