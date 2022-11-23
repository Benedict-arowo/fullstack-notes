import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "./UserContext";

const CheckAuth = ({ Children }) => {
	const User = useUser();
	console.log(User.authenticated);
	if (User.authenticated) {
		return <Navigate to={"../"}></Navigate>;
	}

	return (
		<>
			{Children}
			<Outlet />
		</>
	);
};

export default CheckAuth;
