import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useFetch } from "../../fetchReq";
import { useHideOverlay } from "./Overlays";

const Folder = (props) => {
	const customFetch = useFetch();
	const FolderElement = useRef();
	const hideOverlay = useHideOverlay();

	useEffect(() => {
		if (props.itemStatus === "show") {
			FolderElement.current.style.cssText = "display: flex; opacity: 0";

			setTimeout(() => {
				FolderElement.current.style.opacity = 1;
			}, 100);
		} else {
			FolderElement.current.style.cssText = "";
		}
	}, [props.itemStatus]);

	const updateFolderComponent = ({ item, newValue }) => {
		setFolderComponent((prev) => {
			return {
				...prev,
				[`${item}`]: newValue,
			};
		});

		setTimeout(() => {
			console.log(folderComponent);
		}, 100);
	};

	const [folderComponent, setFolderComponent] = useState({
		folder: "",
		color: "#ffffff",
	});

	const newFolder = async (event) => {
		event.preventDefault();
		const response = await customFetch({
			url: "folders",
			options: {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("token"),
				},
				body: JSON.stringify({
					name: folderComponent.folder,
					color: folderComponent.color,
				}),
			},
		});

		const data = await response.json();
		console.log(data);

		FolderElement.current.click(); // Simulates a click on the FolderElement element, causing the Overlay to be hidden.
		updateFolderComponent({ newValue: "", item: "folder" });
		updateFolderComponent({ newValue: "", item: "color" });
	};

	return (
		<div
			ref={FolderElement}
			className="overlay grid place-content-center duration-300"
			onClick={hideOverlay}
		>
			<form
				action=""
				onSubmit={newFolder}
				className="bg-blue-300 dark:bg-blue-800 rounded-sm p-4 h-fit transition-all duration-500 px-4 py-4 w-1/2 "
			>
				<div className="bg-white w-full flex flex-row gap-2 items-center hover:drop-shadow-lg active:drop-shadow-lg transition-all duration-300 rounded-full overflow-hidden">
					<input
						autoComplete="off"
						autoCorrect="false"
						type="text"
						name="title"
						id="titke"
						placeholder="New Folder Title..."
						className="rounded-full px-6 py-4 text-2xl text-gray-600 w-full "
						value={folderComponent.folder}
						onChange={(e) =>
							updateFolderComponent({
								newValue: e.currentTarget.value,
								item: "folder",
							})
						}
					/>

					<input
						type="color"
						name="folder-color"
						className="cursor-pointer translate-x-2 drop-shadow-lg"
						id="folder-color"
						value={folderComponent.color}
						onChange={(e) =>
							updateFolderComponent({
								newValue: e.currentTarget.value,
								item: "color",
							})
						}
					/>
				</div>
			</form>
		</div>
	);
};

export default Folder;
