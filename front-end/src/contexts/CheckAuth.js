import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const CheckAuth = ({ Children }) => {
	if (localStorage.getItem("token")) {
		return <Navigate to={"../"}></Navigate>;
	} else {
		return (
			<div>
				{Children}
				<Outlet />
			</div>
		);
	}
};

export default CheckAuth;
