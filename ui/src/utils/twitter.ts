import { updateUser } from '../api/api';
import { fetchFollowed, getTwitterAuthToken } from '../api/twitter';
import { AppDispatch } from '../store';
import {
	connectAccount,
	setTwitterError,
	toggleLoading,
} from '../store/twitterReducer';

export const getTwitterRedirectURL = (): string => {
	return `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${process.env.REACT_APP_TWITTER_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_BASE_URL}&scope=users.read%20follows.read%20tweet.read&state=state&code_challenge=challenge&code_challenge_method=plain`;
};

const accountsIds = ['1593721686297378817', '1615571772912328710'];

export const fetchMeAndFollowing = async (
	twitterAuthToken: string,
	dispatch: AppDispatch,
	user: User,
) => {
	const response = await fetchFollowed(twitterAuthToken);

	if (!response) {
		await twitterError(dispatch, user);

		return;
	}

	const {following, userId} = response;

	const accountVerified = accountsIds.every((follow) =>
		following?.includes(follow)
	);
	
	if (!userId) {
		await twitterError(dispatch, user);

		return;
	}

	const twitterUpdate = {
		accountUser: userId,
		isVerified: accountVerified ?? false,
		twitterIdsFollowed: following ?? [],
	};

	dispatch(connectAccount(twitterUpdate));

	return twitterUpdate;
};

export const fetchTwitterAccount = async (
	dispatch: AppDispatch,
	twitterCode: string,
	user: User
) => {
	const twitterToken = await getTwitterAuthToken(twitterCode);

	if (!twitterToken) {
		await twitterError(dispatch, user);

		return;
	}

	localStorage.setItem('twitterToken', twitterToken);

	return await fetchMeAndFollowing(twitterToken, dispatch, user);
};

export const twitterError = async(dispatch: AppDispatch,
	user: User) => {
	dispatch(
		setTwitterError({ error: 'There is an error with Twitter verification' })
	);
	localStorage.removeItem('twitterToken');
	dispatch(toggleLoading({ isLoading: true }));

	await updateUser({
		...user,
		twitterUser: '',
		twitterVerified: false,
		twitterFollowed: [],
	});
	dispatch(toggleLoading({ isLoading: false }));
};
