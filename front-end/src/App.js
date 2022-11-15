import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/nav";
import Login from "./pages/authentication/Login";
import Register from "./pages/authentication/Register";
import "./index.css";
import CheckAuth from "./contexts/CheckAuth";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="" element={<CheckAuth />}>
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
