import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import Select from "react-select";
import { useFolders } from "../../contexts/UserContext";
import { useFetch } from "../../fetchReq";
import { useHideOverlay } from "./Overlays";

const Item = (props) => {
	const folders = useFolders();
	const ItemElement = useRef();
	const customFetch = useFetch();
	const hideOverlay = useHideOverlay();
	const [itemComponent, setItemComponent] = useState({
		name: "",
		folder: "",
		folderId: "",
		note: "",
		mode: "",
	});

	useEffect(() => {
		if (props.itemStatus === "show") {
			ItemElement.current.style.cssText = "display: flex; opacity: 0";
			setTimeout(() => {
				ItemElement.current.style.opacity = 1;
			}, 100);
		} else {
			ItemElement.current.style.cssText = "";
		}
	}, [props.itemStatus]);

	const updateItemComponent = ({ item, newValue }) => {
		if (item === "folder") {
			setItemComponent((prev) => {
				return {
					...prev,
					folderId: newValue.value,
					folder: newValue.label,
				};
			});
			return;
		} else if (item === "mode") {
			setItemComponent((prev) => {
				return {
					...prev,
					mode: newValue.value,
				};
			});
			return;
		}

		setItemComponent((prev) => {
			return {
				...prev,
				[`${item}`]: newValue,
			};
		});

		setTimeout(() => {
			console.log(itemComponent);
		}, 100);
	};

	const newItem = async (event) => {
		event.preventDefault();
		ItemElement.current.click();
		// name: '',
		// folder: '',
		// folderId: '',
		// note: '',
		const response = await customFetch({
			url: "notes",
			options: {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("token"),
				},
				body: JSON.stringify({
					title: itemComponent.name,
					note: itemComponent.note,
					folderName: itemComponent.folder,
					folderId: itemComponent.folderId,
				}),
			},
		});

		const data = await response.json();
		console.log(data);
	};

	const modeList = [
		{ value: "plain", label: "Plain" },
		{ value: "markdown", label: "Markdown" },
	];

	return (
		<div
			ref={ItemElement}
			className="overlay grid place-content-center duration-300"
			onClick={hideOverlay}
		>
			<form
				action=""
				onSubmit={newItem}
				method="post"
				className="flex flex-col gap-4 bg-blue-300 dark:bg-blue-800 w-1/2 px-4 py-2 dark:text-slate-100 rounded-md"
			>
				<legend className="w-full text-center text-lg font-bold">
					Create an item
				</legend>
				<div className="flex flex-col gap-2 mb-2">
					<div className="flex flex-col">
						<label htmlFor="name">Item Name</label>
						<input
							value={itemComponent.name}
							onChange={(e) =>
								updateItemComponent({
									newValue: e.currentTarget.value,
									item: "name",
								})
							}
							type="text"
							placeholder="Name"
							className="border border-slate-400 rounded-md px-2 text-slate-700 py-1 hover:border-slate-400 focus:border-slate-400"
						/>
					</div>
					{/* <textarea value={itemComponent.note} onChange={(e) => updateItemComponent({newValue: e.currentTarget.value, item: 'note'})} name="note" cols="30" rows="10"></textarea> */}
					<div className="flex flex-col">
						<label htmlFor="folder">Folder</label>
						<Select
							onChange={(e) =>
								updateItemComponent({
									newValue: e,
									item: "folder",
								})
							}
							options={folders.folderList}
							id="folder"
							defaultValue={
								folders.folderList && folders.folderList[0]
							}
						/>
					</div>
					<div className="flex flex-col">
						<label htmlFor="mode">Mode: </label>
						<Select
							onChange={(e) =>
								updateItemComponent({
									newValue: e,
									item: "mode",
								})
							}
							defaultValue={modeList[0]}
							id="mode"
							options={modeList}
						/>
					</div>
				</div>
				<button
					type="submit"
					className="bg-white rounded-sm text-slate-600 hover:bg-blue-300 dark:hover:bg-blue-800 duration-300 hover:text-white border border-blue-900"
				>
					Create
				</button>
			</form>
		</div>
	);
};

export default Item;
