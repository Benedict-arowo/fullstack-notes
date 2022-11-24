import React from "react";
import { Route, Routes } from "react-router-dom";
import Container from "./components/Container.jsx";
import Login from "./pages/authentication/Login.jsx";
import Register from "./pages/authentication/Register.jsx";
import "./index.css";
import RedirectAuth from "./contexts/RedirectAuth";
import Index from "./pages/Index.jsx";
import AuthContext from "./contexts/UseAuth.js";

const App = () => {
	return (
		<>
			<Routes>
				<Route path="" element={<RedirectAuth />}>
					{/* For Authentication */}
					<Route path="login" element={<Login />}></Route>
					<Route path="register" element={<Register />} />
				</Route>
				<Route path="" element={<AuthContext />}>
					<Route path="" element={<Container />}>
						<Route index element={<Index />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
};

export default App;
