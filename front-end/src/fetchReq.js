import { API_URL } from "./config";

const fetchReq = async ({ url, options }) => {
	try {
		const response = await fetch(`${API_URL}${url}`, options);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
		return; // TODO: Handle error using error context
	}
};

export default fetchReq;
