const BASE_URL = process.env.REACT_APP_API_URL ?? 'localhost:8000';

export const getUserByAddress = async (
	address: string,
): Promise<User | null> => {
	const requestOptions = {
		method: 'GET',
	};
	const url = `${BASE_URL}users/${address}`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response) return null;

		return response.data?.user;
	} catch(err) {
		return null;
	}
};

export const updateUser = async (user: User) => {
	const requestOptions = {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			user
		}),
	};

	const url = `${BASE_URL}users/`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response) return null;

		return response.data?.user;
	} catch(err) {
		return null;
	}
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

	const url = `${BASE_URL}users/`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response) return null;

		return response.data?.user;
	} catch(err) {
		return null;
	}
};


export const fetchRandomUUID = async (): Promise<string | null> => {
	const requestOptions = {
		method: 'GET',
	};
	const url = `${BASE_URL}authentication`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response) return null;

		return response.data?.uuid;
	} catch(err) {
		return null;
	}
};

export const generateToken = async (sign: string): Promise<string | null> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			sign
		}),
	};
	const url = `${BASE_URL}authentication`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response) return null;

		return response.data?.token;
	} catch(err) {
		return null;
	}
};

export const verifyToken = async (token: string): Promise<string | null> => {
	const requestOptions = {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const url = `${BASE_URL}authentication/verify`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response.status) return null;

		return response.data?.token;
	} catch(err) {
		return null;
	}
};

export const finishRegistration = async (address: string, answers?: Question[]): Promise<string | null> => {
	const requestOptions = {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			address,
			answers
		}),
	};
	const url = `${BASE_URL}users/finishRegistration`;

	try {
		const response = await fetch(url, requestOptions).then((data) => data.json());
		if (!response) return null;

		return response.data?.token;
	} catch(err) {
		return null;
	}
};
