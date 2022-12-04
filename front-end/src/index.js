import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import FetchContext from "./fetchReq";
import GlobalContext from "./contexts/GlobalContext";
import UserContext from "./contexts/UserContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<GlobalContext>
			<BrowserRouter>
				<FetchContext>
					<UserContext>
						<App />
					</UserContext>
				</FetchContext>
			</BrowserRouter>
		</GlobalContext>
	</React.StrictMode>
);
