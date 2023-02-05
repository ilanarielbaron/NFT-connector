import { useCallback, useEffect, useState } from 'react';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Main } from '../../components/Main/Main';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectErrorMessage, selectUserIsLoading, selectUserIsRegistered } from '../../store/userReducer';
import { accountChanged, chainChanged } from '../../utils/metamask';
import { userIsConnected } from '../../utils/user';

const Home = () => {
	const dispatch = useAppDispatch();
	const userIsRegistered = useAppSelector(selectUserIsRegistered);
	const params = useSearchParams();

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

			const twitterCode = params[0].get('code');

			userIsConnected(dispatch, twitterCode);
		}
	}, []);

	const isLoading = useAppSelector(selectUserIsLoading);
	const error = useAppSelector(selectErrorMessage);

	const [open, setOpen] = useState(false);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	if (isLoading) return <CircularProgress sx={{ marginTop: 5 }} />;

	return (
		<>
			{error && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					{error}
				</Alert>
			</Snackbar>}
			<Main userIsRegistered={userIsRegistered}/>;
		</>);
};

export default Home;
