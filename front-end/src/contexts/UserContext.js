import React, { createContext, useContext, useEffect, useState } from "react";
import { useFetch } from "../fetchReq";
// import { useSetErr, useSetLoading } from "./GlobalContext";

const User = createContext();
const SetUser = createContext();
const Notes = createContext();
const SetNotes = createContext();
const Folders = createContext();
const SetFolders = createContext();

const useUser = () => useContext(User);
const useSetUser = () => useContext(SetUser);
const useNotes = () => useContext(Notes);
const useSetNotes = () => useContext(SetNotes);
const useFolders = () => useContext(Folders);
const useSetFolders = () => useContext(SetFolders);

const UserContext = ({ children }) => {
	const customFetch = useFetch();
	const [user, setUser] = useState({ authenticated: false });
	const [notes, setNotes] = useState([]);
	const [folders, setFolders] = useState({ folders: [], folderList: {} });

	const updateUser = (newUser) => {
		console.log(newUser);
		setUser(() => newUser);
	};

	const updateNotes = (newNotes) => {
		setNotes(newNotes);
	};

	const updateFolders = (newFolders) => {
		setFolders(newFolders);
	};

	useEffect(() => {
		(async () => {
			// * Fetches all notes and stores them in state
			let response = await customFetch({
				url: "notes",
				options: {
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("token"),
					},
				},
			});
			let data = await response.json();
			updateNotes(data.data);

			// * Fetches all folders and stores them in state
			response = await customFetch({
				url: "folders",
				options: {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("token"),
					},
				},
			});
			data = await response.json();
			let folderList = data.map((item) => {
				return {
					value: item._id,
					label: item.name,
				};
			});
			folderList.unshift({ value: "", label: "None" });
			updateFolders({ folders: data, folderList });
		})();
		// eslint-disable-next-line
	}, []);

	return (
		<User.Provider value={user}>
			<SetUser.Provider value={updateUser}>
				<Notes.Provider value={notes}>
					<SetNotes.Provider value={updateNotes}>
						<Folders.Provider value={folders}>
							<SetFolders.Provider value={folders}>
								{children}
							</SetFolders.Provider>
						</Folders.Provider>
					</SetNotes.Provider>
				</Notes.Provider>
			</SetUser.Provider>
		</User.Provider>
	);
};

export {
	useUser,
	useSetUser,
	useNotes,
	useSetNotes,
	useFolders,
	useSetFolders,
};
export default UserContext;
