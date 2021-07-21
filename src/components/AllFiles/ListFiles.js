import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { selectLogin } from "../../features/user/userSlice";

import { db } from "../../config/firbase";

import Card from "../Card/Card.js";

const ListFiles = (props) => {
	const user = useSelector(selectLogin);

	const [loading, setLoading] = useState(true);

	const [files, setFiles] = useState([]);

	useEffect(() => {
		if (user.isLoggedin) {
			var list = db.collection(user.user.uid).onSnapshot(
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
		<div>
			{loading ? (
				"Loading"
			) : (
				<>
					{files.map((f) => {
						return <Card key={f.name} {...f} uid={user.user.uid} />;
					})}
				</>
			)}
		</div>
	);
};

export default ListFiles;
