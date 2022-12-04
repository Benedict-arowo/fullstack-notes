import React, { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";
import { useSetErr, useSetLoading } from "./contexts/GlobalContext";

const FetchReq = createContext();
export const useFetch = () => useContext(FetchReq);

const FetchContext = ({ children }) => {
	const setLoading = useSetLoading();
	const setErr = useSetErr();
	const Navigate = useNavigate();
	const fetchData = async ({ url, options }) => {
		try {
			setLoading(true);
			const response = await fetch(`${API_URL}${url}`, options);
			if (response.status === 401) {
				// If user is not authenticated || Invalid credentials
				localStorage.removeItem("token");
				return Navigate("../login");
			}
			if (!response.ok) {
				throw new Error();
			}
			return response;
		} catch (error) {
			setErr({
				status: true,
				msg: "Error fetching data...",
				solution: "Kindly please refresh the page.",
			});
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500); // To prevent loading screen flashing when 2 requests are made one after the other.
		}
	};

	return <FetchReq.Provider value={fetchData}>{children}</FetchReq.Provider>;
};

export default FetchContext;
