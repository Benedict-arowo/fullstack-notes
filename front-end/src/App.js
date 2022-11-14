import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import "./index.css";
import fetchReq from "./fetchReq";

fetchReq({
	url: "notes",
	options: {
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Content-Type": "application/json",
		},
	},
});
const App = () => {
	return (
		<>
			<Nav></Nav>
			<Routes>
				<Route path="/auth">
					<Route path="login" element={<h1>Login Page</h1>}></Route>
					<Route path="register" element={<h1>Register Page</h1>}></Route>
				</Route>
				<Route path="/">
					<Route path="" element={<h1>Main Page</h1>}></Route>
				</Route>
			</Routes>
		</>
	);
};

export default App;
