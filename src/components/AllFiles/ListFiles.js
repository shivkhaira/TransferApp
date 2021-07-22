import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { selectLogin } from "../../features/user/userSlice";

import { db } from "../../config/firbase";

import Card from "../Card/Card.js";

import "./ListFiles.css";

const ListFiles = (props) => {
	const user = useSelector(selectLogin);

	const [loading, setLoading] = useState(true);

	const [files, setFiles] = useState([]);

	const [search, setSearch] = useState("");

	const filterd = files.filter((m) =>
		m.caption.toLowerCase().includes(search.toLowerCase())
	);

	useEffect(() => {
		document.title = "All Files";
		if (user.isLoggedin) {
			var list = db
				.collection(user.user.uid)
				.orderBy("created_at", "desc")
				.onSnapshot(
					(snapshot) => {
						var cities = [];
						snapshot.forEach((doc) => {
							cities.push({ id: doc.id, ...doc.data() });
						});
						setFiles(cities);
						setLoading(false);
					},
					(error) => {
						console.log(error);
					}
				);
		}

		return () => {
			list();
		};
	}, [user]);

	return (
		<div className="col-md-6 mb">
			{loading ? (
				"Loading"
			) : (
				<>
					<div className="form-group">
						<input
							className="form-control"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
						/>
					</div>
					<br />
					{filterd.map((f) => {
						return <Card key={f.name} {...f} uid={user.user.uid} />;
					})}
				</>
			)}
		</div>
	);
};

export default ListFiles;
