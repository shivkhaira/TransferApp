import React, { useEffect, useState } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { auth, provider } from "./config/firbase";

import { useAuthState } from "react-firebase-hooks/auth";

import { useSelector, useDispatch } from "react-redux";

import {
	signIn,
	signOut,
	selectUser,
	checkLogin,
} from "./features/user/userSlice";

import Header from "./components/Header/Header";

import Content from "./components/Content/Content";

import ListFiles from "./components/AllFiles/ListFiles";

import "./App.css";

const App = () => {
	const users = useSelector(selectUser);

	const check = useSelector(checkLogin);

	const dispatch = useDispatch();

	const [user] = useAuthState(auth);

	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (user) {
			dispatch(
				signIn({
					uid: user.providerData[0].uid,
					name: user.displayName,
					email: user.email,
					photo: user.photoURL,
				})
			);
		}
		setLoading(false);
	}, [user, dispatch]);

	const Login = () => {
		auth
			.signInWithPopup(provider)
			.then((res) => {
				console.log(res.user);
				dispatch(
					signIn({
						uid: res.user.providerData[0].uid,
						name: res.user.displayName,
						email: res.user.email,
						photo: res.user.photoURL,
					})
				);
			})
			.catch(alert);
	};

	const logout = () => {
		auth.signOut().then(() => {
			dispatch(signOut());
		});
	};

	return (
		<Router>
			<Header user={users} logout={logout} login={Login} checkLogin={check} />
			{loading ? (
				<h1>Loading</h1>
			) : (
				<div className="container-fluid content">
					{check ? (
						<Switch>
							<Route path="/" exact>
								{users.name}
							</Route>
							<Route path="/upload" exact>
								<Content />
							</Route>
							<Route path="/files" exact>
								<ListFiles />
							</Route>
						</Switch>
					) : (
						<Switch>
							<Route path="/">
								<h2>Logged Out</h2>
							</Route>
						</Switch>
					)}
				</div>
			)}
		</Router>
	);
};

export default App;
