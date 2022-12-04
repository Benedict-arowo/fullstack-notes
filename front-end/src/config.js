export const API_URL = "http://192.168.100.3:5000/api/v1/";
export const EMAIL_PATTERN =
	// eslint-disable-next-line no-control-regex
	/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const PASSWORD_PATTERN =
	/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
export const USERNAME_PATTERN = /^\D(\w|\d){6,20}$/; // Minimum 6 characters, does not start with a number, maximum 20 characters.

const MONTH_NAMES = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function getFormattedDate(date, prefomattedDate = false, hideYear = false) {
	const day = date.getDate();
	const month = MONTH_NAMES[date.getMonth()];
	const year = date.getFullYear();
	const hours = date.getHours();
	let minutes = date.getMinutes();

	if (minutes < 10) {
		// Adding leading zero to minutes
		minutes = `0${minutes}`;
	}

	if (prefomattedDate) {
		// Today at 10:20
		// Yesterday at 10:20
		return `${prefomattedDate} at ${hours}:${minutes}`;
	}

	if (hideYear) {
		// 10. January at 10:20
		return `${day}. ${month} at ${hours}:${minutes}`;
	}

	// 10. January 2017. at 10:20
	return `${day}. ${month} ${year}. at ${hours}:${minutes}`;
}

// --- Main function
export function timeAgo(dateParam) {
	if (!dateParam) {
		return null;
	}

	const date =
		typeof dateParam === "object" ? dateParam : new Date(dateParam);
	const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
	const today = new Date();
	const yesterday = new Date(today - DAY_IN_MS);
	const seconds = Math.round((today - date) / 1000);
	const minutes = Math.round(seconds / 60);
	const isToday = today.toDateString() === date.toDateString();
	const isYesterday = yesterday.toDateString() === date.toDateString();
	const isThisYear = today.getFullYear() === date.getFullYear();

	if (seconds < 5) {
		return "now";
	} else if (seconds < 60) {
		return `${seconds} seconds ago`;
	} else if (seconds < 90) {
		return "about a minute ago";
	} else if (minutes < 60) {
		return `${minutes} minutes ago`;
	} else if (isToday) {
		return getFormattedDate(date, "Today"); // Today at 10:20
	} else if (isYesterday) {
		return getFormattedDate(date, "Yesterday"); // Yesterday at 10:20
	} else if (isThisYear) {
		return getFormattedDate(date, false, true); // 10. January at 10:20
	}

	return getFormattedDate(date); // 10. January 2017. at 10:20
	// From - https://muffinman.io/blog/javascript-time-ago-function/
}
