import React, { createContext, useContext, useState } from "react";
import ThemeContext from "./ThemeContext";
import ErrComponent from "../components/overlays/Err";
import LoadingComponent from "../components/overlays/Loading";

const Err = createContext();
const SetErr = createContext();
const Loading = createContext();
const SetLoading = createContext();

const useErr = () => useContext(Err);
const useSetErr = () => useContext(SetErr);
const useSetLoading = () => useContext(SetLoading);

const GlobalContext = ({ children }) => {
	const [err, setErr] = useState({ status: false, msg: "", solution: "" });
	const [loading, setLoading] = useState(false);

	const updateErr = ({ status, msg, solution }) => {
		setErr((prevErr) => {
			return {
				status,
				msg,
				solution,
			};
		});
	};

	const updateLoading = (state) => {
		setLoading(state);
	};

	return (
		<ThemeContext>
			<Err.Provider value={err}>
				<SetErr.Provider value={updateErr}>
					<Loading.Provider value={loading}>
						<SetLoading.Provider value={updateLoading}>
							{err.status && <ErrComponent />}
							{loading && <LoadingComponent />}
							{children}
						</SetLoading.Provider>
					</Loading.Provider>
				</SetErr.Provider>
			</Err.Provider>
		</ThemeContext>
	);
};

export { useErr, useSetErr, useSetLoading };
export default GlobalContext;
