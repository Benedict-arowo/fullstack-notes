import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContext from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<UserContext>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserContext>
	</React.StrictMode>
);
