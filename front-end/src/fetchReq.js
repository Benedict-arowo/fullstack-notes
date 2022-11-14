import { API_URL } from "./config";

export const fetchReq = async ({ url, options }) => {
	try {
		const response = await fetch(`${API_URL}${url}`, options);
		return await response.json();
	} catch (error) {
		return error; // TODO: Handle error using error context
	}
};
