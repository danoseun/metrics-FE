/* eslint-disable @typescript-eslint/no-explicit-any */
// Handles all get request
const fetchHandler = async (
	url: string
): Promise<{ data: any; status: number }> => {
	const controller = new AbortController();

	const id = setTimeout(() => controller.abort(), 20000);

	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
		signal: controller.signal,
		method: "GET",
		cache: "no-cache",
		headers: {
			"Content-Type": "application/json",
		},
	});

	clearTimeout(id);

	return {
		data: await response.json(),
		status: response.status,
	};
};

// Hanldes any post request
const postHandler = async <TData>(
	url: string,
	body: TData
): Promise<{ data: any; status: number }> => {
	const controller = new AbortController();

	const id = setTimeout(() => controller.abort(), 20000);

	const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${url}`, {
		signal: controller.signal,
		method: "POST",
		cache: "no-cache",
		body: JSON.stringify(body),
		headers: {
			"Content-Type": "application/json",
		},
	});

	clearTimeout(id);

	return {
		data: await response.json(),
		status: response.status,
	};
};

export const errorCodes = [400, 401, 500, 501, 503, 409, 404];
export const successCodes = [200, 201];

export { fetchHandler, postHandler };
