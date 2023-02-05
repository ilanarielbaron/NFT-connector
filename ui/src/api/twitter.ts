const TWITTER_URL = 'https://api.twitter.com/2/';

export const getTwitterAuthToken = async (code: string): Promise<string | null> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: new URLSearchParams({
			code,
			'grant_type': 'authorization_code',
			'client_id': process.env.REACT_APP_TWITTER_CLIENT_ID ?? '',
			'redirect_uri': process.env.REACT_APP_BASE_URL ?? '',
			'code_verifier': 'challenge',
		}),
	};

	const url = `${TWITTER_URL}oauth2/token`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response['access_token']) return null;

		return response['access_token'];
	} catch(err) {
		return null;
	}
};

export const fetchFollowed = async (token: string): Promise<{userId?: string, following?: string[], error: boolean}> => {
	const requestOptions = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	let url = `${TWITTER_URL}users/me`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response?.data?.id) return {error: true};

		url = `${TWITTER_URL}users/${response.data.id}/following`;

		const followingResponse = await fetch(url, requestOptions).then((data) => data.json());

		const following = followingResponse?.data ?? [];

		return {error: false, userId: response.data.id, following};
	} catch(err) {
		return {error: true};;
	}
};
