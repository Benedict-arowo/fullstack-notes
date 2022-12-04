import React from "react";

const Loading = () => {
	return (
		<div className="activeOverlay grid place-items-center w-full h-full">
			<div className="">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					strokeWidth={1.5}
					stroke="currentColor"
					className="color duration-300 transition-colors rotate w-24 bg-white rounded-full p-4"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
					/>
				</svg>
				<p className="color duration-300 transition-colors font-bold text-white text-2xl">
					Loading...
				</p>
			</div>
		</div>
	);
};

export default Loading;
