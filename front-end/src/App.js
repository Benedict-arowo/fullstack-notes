import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import Login from "./pages/authentication/login";
import "./index.css";
// import fetchReq from "./fetchReq";

// fetchReq({
// 	url: "auth/register",
// 	options: {
// 		crossDomain: true,
// 		method: "POST",
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify({
// 			username: "",
// 			password: "",
// 			email: "",
// 		}),
// 	},
// });

const App = () => {
	return (
		<>
			<Nav></Nav>
			<Routes>
				<Route path="">
					{/* For Authentication */}
					<Route path="login" element={<Login />}></Route>
					<Route path="register" element={<Register />}></Route>
				</Route>
				<Route path="" element={<Nav />}>
					<Route index element={<h1>Main Page</h1>}></Route>
				</Route>
			</Routes>
		</>
	);
};

export default App;
