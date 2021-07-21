import React from "react";

import { Link } from "react-router-dom";

import "./Header.css";

const Header = (props) => {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
			<Link className="navbar-brand" to="/">
				Transfer App
			</Link>
			<button
				className="navbar-toggler"
				type="button"
				data-toggle="collapse"
				data-target="#navbarSupportedContent"
				aria-controls="navbarSupportedContent"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span className="navbar-toggler-icon"></span>
			</button>

			<div className="collapse navbar-collapse" id="navbarSupportedContent">
				{props.checkLogin && (
					<ul className="navbar-nav mr-auto">
						<li className="nav-item active">
							<Link className="nav-link" to="/upload">
								Upload Files
							</Link>
						</li>
						<li className="nav-item">
							<Link className="nav-link" to="/files">
								All Files
							</Link>
						</li>
					</ul>
				)}
			</div>
			<div className="text-right">
				{props.checkLogin ? (
					<>
						<div className="nameScreen">
							<img
								src={props.user.photo}
								alt={props.user.name}
								className="avatar"
							/>

							<p className="text-primary nameScreen ml">{props.user.name}</p>
							<button
								className="btn btn-info ml nameScreen"
								onClick={props.logout}
							>
								Logout
							</button>
						</div>
					</>
				) : (
					<button className="nav-link" onClick={props.login}>
						Login
					</button>
				)}
			</div>
		</nav>
	);
};

export default Header;
