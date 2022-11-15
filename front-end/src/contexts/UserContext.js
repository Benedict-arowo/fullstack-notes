import React, { createContext, useContext, useState } from "react";

const User = createContext();
const SetUser = createContext();

export const useUser = () => useContext(User);
export const useSetUser = () => useContext(SetUser);

const UserContext = ({ children }) => {
	const [user, setUser] = useState({ authenticated: false });

	const updateUser = (newUser) => {
		setUser(() => newUser);
	};

	return (
		<User.Provider value={user}>
			<SetUser.Provider value={updateUser}>{children}</SetUser.Provider>
		</User.Provider>
	);
};

export default UserContext;
