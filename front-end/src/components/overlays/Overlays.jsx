import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import Item from "./Item";
import Folder from "./Folder";

const OverlaysProvider = createContext();
const HideOverlay = createContext();

export const useHideOverlay = () => useContext(HideOverlay);
export const useOverlays = () => useContext(OverlaysProvider);

const Overlays = ({ children }) => {
	const [itemStatus, setItemStatus] = useState("hide");
	const [folderStatus, setFolderStatus] = useState("hide");

	const hideOverlay = (e) => {
		let classLists = e.target.className.split(" ");
		if (classLists.includes("overlay")) {
			const element = e.target;
			element.style.cssText = "opacity: 0; display: flex;";
			// Fade out effect.
			setTimeout(() => {
				element.style.display = "none";
				setItemStatus("hide");
				setFolderStatus("hide");
			}, 100);
		}
	};

	const toggleFolder = (mode) => {
		mode === "folder" ? setFolderStatus("show") : setItemStatus("show");
	};

	return (
		<OverlaysProvider.Provider value={toggleFolder}>
			<HideOverlay.Provider value={hideOverlay}>
				{children}
				<Folder itemStatus={folderStatus} />

				<Item itemStatus={itemStatus} />
			</HideOverlay.Provider>
		</OverlaysProvider.Provider>
	);
};

export default Overlays;
