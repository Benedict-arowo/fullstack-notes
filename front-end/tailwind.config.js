/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: 'class',
	theme: {
		minHeight: {
			"3/4": "70%",
		},
		minWidth: {
			'sidebar': '280px',
			'container-min': '240px'
		},
		screens: {
			'xs': { max: '412px' }
		},
		extend: {},
	},
	plugins: [
		require('@tailwindcss/line-clamp'),
	],
};
