import React from "react";
import { Route, Routes } from "react-router-dom";
import Nav from "./components/Nav.jsx";
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import "./index.css";
import RedirectAuth from "./contexts/RedirectAuth";
import UseAuth from "./contexts/UseAuth.js";
import Index from "./pages/Index.jsx";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="" element={<RedirectAuth />}>
					{/* For Authentication */}
					<Route path="login" element={<Login />}></Route>
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="" element={<UseAuth />}>
					<Route path="" element={<Nav />}>
						<Route index element={<Index />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
};

export default App;
