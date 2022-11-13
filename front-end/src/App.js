import React from "react";
import { Route, Routes } from "react-router-dom";

const App = () => {
	return (
		<>
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
