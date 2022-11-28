import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContext from "./contexts/UserContext";
import { BrowserRouter } from "react-router-dom";
import ThemeContext from "./contexts/ThemeContext";
import FetchContext from "./fetchReq";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<UserContext>
			<ThemeContext>
				<BrowserRouter>
					<FetchContext>
						<App />
					</FetchContext>
				</BrowserRouter>
			</ThemeContext>
		</UserContext>
	</React.StrictMode>
);
