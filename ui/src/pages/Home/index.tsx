import { Alert, CircularProgress } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Main } from '../../components/Main/Main';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectErrorMessage, selectUserIsLoading } from '../../store/userReducer';
import { selectWalletIsConnected } from '../../store/walletReducer';
import { accountChanged, chainChanged } from '../../utils/metamask';
import { userIsConnected } from '../../utils/user';

const Home = () => {
	const dispatch = useAppDispatch();
	//const wallet = useAppSelector(selectWallet);
	const [searchParams, sett] = useSearchParams();

	const accountChangeMetamask = useCallback(async (address: string[]): Promise<void> => {
		accountChanged(address[0], dispatch);
	}, []);

	// Initialize the application and MetaMask Event Handlers
	useEffect(() => {
		//@ts-expect-error out of typescript scope
		if (window.ethereum) {
			//@ts-expect-error out of typescript scope
			window.ethereum.on('accountsChanged', accountChangeMetamask);
			//@ts-expect-error out of typescript scope
			window.ethereum.on('chainChanged', chainChanged);

			const twitterCode = searchParams.get('code');

			userIsConnected(dispatch, twitterCode);
		}
	}, []);
	
	const walletConnected = useAppSelector(selectWalletIsConnected);
	const isLoading = useAppSelector(selectUserIsLoading);
	const error = useAppSelector(selectErrorMessage);

	if (error) return <Alert severity='error'>{error}</Alert>;

	if (isLoading) return <CircularProgress sx={{ marginTop: 5 }} />;

	return <>{walletConnected || true  && 
	//main component here
		<Main/>
	}</>;
};

export default Home;
