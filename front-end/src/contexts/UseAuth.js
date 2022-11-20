import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useSetUser } from "./UserContext";

const UseAuth = ({ children }) => {
	<Navigate to={"../login"}></Navigate>;

	const setUser = useSetUser();
	let token = localStorage.getItem("token");

	console.log(token);
	if (!token || !token.startsWith("Bearer")) {
		setUser({ authenticated: false });
		<Navigate to={"../login"} />;
	}

	try {
		token = token.split(" ")[1];
		const decoded = jwt_decode(token);
	} catch (error) {
		<Navigate to="/login" />;
	}

	// Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNzNkY2Y5MWUwMTVjNmFkYTY5MTg0YSIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE2Njg1MzgwMTUsImV4cCI6MTY2OTkyMDQxNX0.2TOCTeuoks4RH8WdfgHVbD1YuDQpkZlPyS9n8BAwMZQ

	// setUser(decoded);
	return (
		<>
			{children}
			<Outlet />
		</>
	);
};

export default UseAuth;
