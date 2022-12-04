import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL, PASSWORD_PATTERN, USERNAME_PATTERN } from "../../config";
import { useSetUser } from "../../contexts/UserContext";
import { useFetch } from "../../fetchReq";

const Login = () => {
	const customFetch = useFetch();
	const Navigate = useNavigate();
	const setUser = useSetUser();
	const userData = useLocation();
	const passwordHolder = useRef("");
	const [passwordType, setPasswordType] = useState();
	// Allow signing in using emails...
	const [userCredentials, setUserCredentials] = useState({
		username: "",
		password: "",
	});

	useEffect(() => {
		// Fills up the form with incoming state data from the login page except the password if it exists
		if (userData.state) {
			setUserCredentials(() => {
				return { ...userCredentials, ...userData.state, password: "" };
			});
		}
		// eslint-disable-next-line
	}, [userData]);

	const handleChange = (item, newChange) => {
		// Updates the state with the info passed in.
		setUserCredentials((prevCredentials) => {
			return {
				...prevCredentials,
				[item]: newChange,
			};
		});
	};

	const togglePasswordView = (e) => {
		e.preventDefault();
		const element = passwordHolder.current;
		element.type = element.type === "password" ? "text" : "password";
		setPasswordType(() => element.type); // For deciding on what icon to display
	};

	const loginUser = async (e) => {
		e.preventDefault();

		// Checks if the given data matches the regex pattern
		// Validates username.
		if (!USERNAME_PATTERN.test(userCredentials.username)) {
			throw new Error("Invalid Username"); // TODO: need to handle properly
		}
		// Validates password
		if (!PASSWORD_PATTERN.test(userCredentials.password)) {
			console.log(userCredentials.password);
			throw new Error("Invalid Password"); // TODO: need to handle properly
		}

		const response = await customFetch({
			url: "auth/login",
			options: {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(userCredentials),
			},
		});
		// Reset the form
		console.log(response);
		const data = await response.json();
		if (!response.ok) {
			// If an error occurs
			console.log("An error as occured"); // TODO: show a nice alert for error
			setUser({ authenticated: false });
			throw new Error(data.msg);
		}
		setUserCredentials({ username: "", password: "", email: "" });
		const accessToken = data.token;
		localStorage.setItem("token", `Bearer ${accessToken}`); // TODO: change local storage to cookie.
		setUser({
			authenticated: true,
			id: data.user._id,
			username: data.user.username,
		});
		console.log("Successfully logged in!");
		Navigate("../");
	};

	return (
		<div className="grid place-items-center w-full h-full drop-shadow-lg">
			<div className="bg-slate-200 w-max rounded-md overflow-hidden">
				<h1 className="w-full bg-blue-600 text-white text-2xl font-bold text-center py-2">
					Login
				</h1>
				<form
					action={`${API_URL}auth/login`}
					className="px-8 mt-2 pb-4"
					method="POST"
					onSubmit={(e) => loginUser(e)}
				>
					<div className="w-full flex flex-col text-md max-w-xs">
						<label
							htmlFor="username"
							className="font-medium text-blue-600 text-xl"
						>
							Username
						</label>
						<input
							type="text"
							name="username"
							id="username"
							className="border border-slate-300 hover:border-slate-300 focus:border-blue-500 px-2 py-1 text-slate-500"
							value={userCredentials.username}
							onChange={(e) =>
								handleChange(
									e.currentTarget.name,
									e.target.value
								)
							}
							autoComplete="off"
						/>
					</div>

					<div className="w-full flex flex-col text-md max-w-xs">
						<label
							htmlFor="password"
							className="font-medium text-blue-600 text-xl"
						>
							Password
						</label>
						<div className="w-full flex text-md max-w-xs flex-row items-center gap-2">
							<input
								className="border border-slate-300 hover:border-slate-300 focus:border-blue-500 px-2 py-1 text-slate-500"
								ref={passwordHolder}
								type="password"
								name="password"
								value={userCredentials.password}
								onChange={(e) =>
									handleChange(
										e.currentTarget.name,
										e.target.value
									)
								}
								id="password"
							/>
							{passwordType === "text" ? (
								<svg
									onClick={(e) => togglePasswordView(e)}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 cursor-pointer passwordIcon"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
									/>
								</svg>
							) : (
								<svg
									onClick={(e) => togglePasswordView(e)}
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.5}
									stroke="currentColor"
									className="w-6 cursor-pointer passwordIcon"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							)}
						</div>
					</div>

					<button className="px-6 bg-blue-500 hover:bg-blue-600 duration-500 text-white mt-4 w-full">
						Login
					</button>
					<p className="text-slate-500">
						Don&apos;t have an account?{" "}
						<Link
							to="../register"
							className="underline text-slate-800"
							state={userCredentials}
						>
							Register
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
};

export default Login;
