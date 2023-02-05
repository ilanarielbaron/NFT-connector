const BASE_URL = process.env.REACT_APP_API_URL ?? 'localhost:8000';

export const getTwitterAuthToken = async (
	code: string
): Promise<string | null> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			code,
		}),
	};

	const url = `${BASE_URL}twitter/authToken`;

	try {
		const response = await fetch(url, requestOptions).then((data) =>
			data.json()
		);
		if (!response) return null;

		return response.data?.token;
	} catch (err) {
		return null;
	}
};

export const fetchFollowed = async (
	token: string
): Promise<{ following: string[]; userId: string } | null> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token,
		}),
	};

	const url = `${BASE_URL}twitter/fetchFollowed`;

	try {
		const response = await fetch(url, requestOptions).then((data) =>
			data.json()
		);
		if (!response) return null;

		return response.data;
	} catch (err) {
		return null;
	}
};
