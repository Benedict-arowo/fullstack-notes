import React, { useEffect } from "react";
import ItemsComponent from "../components/ItemsComponent";
import Overlays from "../components/overlays/Overlays";
import Sidebar from "../components/Sidebar";
import { useSetTheme } from "../contexts/ThemeContext";
import Header from "../components/Header";

const Index = () => {
	const updateTheme = useSetTheme();

	useEffect(() => {
		if (localStorage.getItem("theme")) {
			updateTheme(localStorage.getItem("theme"));
		} else {
			if (
				localStorage.theme === "dark" ||
				(!("theme" in localStorage) &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)
			) {
				updateTheme("dark");
			}
		}
		// eslint-disable-next-line
	}, []);

	return (
		<Overlays>
			<Sidebar />
			<main className="w-full h-full pt-4 bg-blue-100 dark:bg-blue-700 overflow-y-scroll pb-4">
				<Header />
				<section className="mt-10 px-8 flex flex-col gap-4 items-center xs:px-0">
					<ItemsComponent />
				</section>
			</main>
		</Overlays>
	);
};

export default Index;
