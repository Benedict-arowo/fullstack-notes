import jwt_decode from "jwt-decode";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const RedirectAuth = ({ Children }) => {
	const Navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem('token')) {
			try {
				const token = localStorage.getItem('token').split(" ")[1];
				const decoded = jwt_decode(token);
				console.log(decoded)
				if (decoded) {
					Navigate('../')
				}
			} catch (err) {
				console.log(err)
			}
		}
		// eslint-disable-next-line
	}, [])

	return (
		<>
			{Children}
			<Outlet />
		</>
	);
};

export default RedirectAuth;
