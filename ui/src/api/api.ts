const BASE_URL = process.env.REACT_APP_API_URL ?? 'localhost:8000';

export const getUserByAddress = async (
	address: string,
): Promise<User | null> => {
	const requestOptions = {
		method: 'GET',
	};
	const url = `${BASE_URL}${address}`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response) return null;

		return response.data?.user;
	} catch(e:unknown) {
		return null;
	}
};

export const updateUser = async () => {
	return;
};

export const createUser = async (address: string): Promise<User | null> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			publicAddress: address
		}),
	};

	console.log(requestOptions);
	try {
		const response = await fetch(BASE_URL, requestOptions).then((data) => data.json());
		if (!response) return null;

		return response.data?.user;
	} catch(e: unknown) {
		return null;
	}
};
