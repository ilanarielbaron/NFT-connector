import { useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { getUserByAddress, updateUser } from '../../api/api';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAccount, selectTwitterError, selectTwitterIsLoading, toggleLoading } from '../../store/twitterReducer';
import { selectWallet } from '../../store/walletReducer';
import { fetchMeAndFollowing, getTwitterRedirectURL } from '../../utils/twitter';

export const TwitterButton = () => {
	const redirectURL = getTwitterRedirectURL();
	const twitterAccount = useAppSelector(selectAccount);
	const twitterToken = localStorage.getItem('twitterToken');
	const dispatch = useAppDispatch();
	const address = useAppSelector(selectWallet)?.address;
	const twitterIsLoading = useAppSelector(selectTwitterIsLoading);
	const twitterError = useAppSelector(selectTwitterError);

	const accountLoggedButNotVerified = twitterAccount?.accountUser && !twitterAccount.isVerified;

	const [open, setOpen] = useState(false);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const onClick = async () => {
		if (accountLoggedButNotVerified && address) {
			const user = await getUserByAddress(address);

			if (user) {
				const twitterUpdate = await fetchMeAndFollowing(twitterToken ?? '', dispatch, user);

				if (twitterUpdate) {
					dispatch(toggleLoading({ isLoading: true }));
					await updateUser({
						...user,
						twitterUser: twitterUpdate.accountUser,
						twitterVerified: twitterUpdate.isVerified,
						twitterFollowed: twitterUpdate.twitterIdsFollowed,
					});
					dispatch(toggleLoading({ isLoading: false }));
				}
			}
		}
	};

	return (
		<>
			{twitterError && <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
					{twitterError}
				</Alert>
			</Snackbar>}
			<Button
				variant='outlined'
				sx={{ my: 1, mx: 1.5 }}
				href={!twitterAccount?.accountUser ? redirectURL : ''}
				onClick={onClick}
			>
				{twitterIsLoading && 'Loading'}
				{!twitterIsLoading && (twitterAccount?.isVerified ? 'Account Verified' : accountLoggedButNotVerified ? 'Verify' : 'Connect Twitter')}
			</Button>
		</>
	);
};
