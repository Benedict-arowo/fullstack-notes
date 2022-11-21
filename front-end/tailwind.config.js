/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		minHeight: {
			"3/4": "70%",
		},
		minWidth: {
			'sidebar': '250px'
		},
		extend: {},
	},
	plugins: [],
};
