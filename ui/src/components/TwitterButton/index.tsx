import { useState } from 'react';
import { Alert, Button, Snackbar } from '@mui/material';
import { getUserByAddress, updateUser } from '../../api/api';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { selectAccount, selectTwitterError, selectTwitterIsLoading, toggleLoading } from '../../store/twitterReducer';
import { selectWallet } from '../../store/walletReducer';
import { fetchMeAndFollowing, getTwitterRedirectURL } from '../../utils/twitter';
import actionArrow from './action-arrow.svg';

export const TwitterButton = () => {
	const dispatch = useAppDispatch();
	const twitterAccount = useAppSelector(selectAccount);
	const twitterError = useAppSelector(selectTwitterError);
	const twitterIsLoading = useAppSelector(selectTwitterIsLoading);
	const address = useAppSelector(selectWallet)?.address;

	const redirectURL = getTwitterRedirectURL();
	const twitterToken = localStorage.getItem('twitterToken');
	
	const accountLoggedButNotVerified = twitterAccount?.accountUser && !twitterAccount.isVerified;

	const [open, setOpen] = useState(false);

	const handleClose = (event?: React.SyntheticEvent | Event, reason?: string): void => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	const onClick = async (): Promise<void> => {
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
				disabled={twitterIsLoading || twitterAccount?.isVerified}
				variant='text'
				sx={{ color: 'white', fontSize:'20px', fontWeight:'400', p:0 }}
				href={!twitterAccount?.accountUser ? redirectURL : ''}
				onClick={onClick}
			>
				{twitterIsLoading && 'Loading'}
				{!twitterIsLoading && (twitterAccount?.isVerified ? 'Account Verified' : accountLoggedButNotVerified ? 'Verify' : 'CONNECT & VERIFY')}
				{!twitterIsLoading &&
				<img src={actionArrow} alt="Action arrow" style={{marginLeft:'15px'}}/>
				}
			</Button>
		</>
	);
};
