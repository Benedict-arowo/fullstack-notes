import { API_URL } from "./config";

const fetchReq = async ({ url, options }) => {
	try {
		const response = await fetch(`${API_URL}${url}`, options);
		console.log(response);
		if (!response.OK) {
			throw new Error("Something went wrong.");
		}
	} catch (error) {
		console.log(error);
		return; // TODO: Handle error using error context
	}
};

export default fetchReq;
