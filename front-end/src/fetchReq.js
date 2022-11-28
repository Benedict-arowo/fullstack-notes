import React, { createContext, useContext } from 'react'
import { useNavigate } from "react-router-dom";
import { API_URL } from "./config";


const FetchReq = createContext()
export const useFetch = () => useContext(FetchReq)

const FetchContext = ({ children }) => {
	const Navigate = useNavigate()
	const fetchData = async ({ url, options }) => {
		try {
			const response = await fetch(`${API_URL}${url}`, options);
			if (response.status === 401) {
				// If user is not authenticated || Invalid credentials
				localStorage.removeItem('token');
				return Navigate("../login")
			}
			return response;
		} catch (error) {
			return error; // TODO: Handle error using error context
		}
	};

	return (
		<FetchReq.Provider value={fetchData}>
			{children}
		</FetchReq.Provider>
	)
}

export default FetchContext