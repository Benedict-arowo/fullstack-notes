import React, { createContext, useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AuthProvider = createContext()
export const useUser = () => useContext(AuthProvider)

const AuthContext = ({ children }) => {
	const navigate = useNavigate()
	const [user, setUser] = useState();

	useEffect(() => {
		let token = localStorage.getItem("token");
		if (!token || !token.startsWith("Bearer")) {
			navigate('../login')
		}

		try {
			token = token.split(" ")[1];
			const decoded = jwt_decode(token);
			setUser(decoded)
		} catch (error) {
			navigate('/login')
		}
		// eslint-disable-next-line 
	}, [])

	// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzNkY2Y5MWUwMTVjNmFkYTY5MTg0YSIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE2Njg1MzgwMTUsImV4cCI6MTY2OTkyMDQxNX0.2TOCTeuoks4RH8WdfgHVbD1YuDQpkZlPyS9n8BAwMZQ

	// setUser(decoded);
	return (
		<AuthProvider.Provider value={user}>
			{children}
			<Outlet />
		</AuthProvider.Provider>
	);
};

export default AuthContext;
