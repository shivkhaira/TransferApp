import React, { useState, useEffect } from "react";

import { storageRef, db } from "../../config/firbase";

import "./Card.css";

const Card = (props) => {
	const [url, setUrl] = useState("");

	useEffect(() => {
		storageRef
			.child(`/files/${props.uid}/${props.name}`)
			.getDownloadURL()
			.then((url) => {
				setUrl(url);
			});
	}, [props.name, props.uid]);

	const DeleteItem = () => {
		var desertRef = storageRef.child(`/files/${props.uid}/${props.name}`);

		db.collection(props.uid)
			.doc(props.id)
			.delete()
			.then(() => {
				console.log("Document successfully deleted!");
			})
			.catch((error) => {
				console.error("Error removing document: ", error);
			});
		desertRef
			.delete()
			.then(() => {
				// File deleted successfully
			})
			.catch((error) => {
				// Uh-oh, an error occurred!
			});
	};

	return (
		<div className="file card">
			<div className="card-body">
				<h5 className="card-title">{props.caption}</h5>
				<h6 className="card-subtitle mb-2 text-muted">
					{new Date(props.created_at.seconds * 1000).getDate() +
						"/" +
						(new Date(props.created_at.seconds * 1000).getMonth() + 1) +
						"/" +
						new Date(props.created_at.seconds * 1000).getFullYear()}
				</h6>
				<p className="card-text">{props.name}</p>
				<a href={url} target="_blank" rel="noreferrer" className="card-link">
					Download
				</a>
				<button className="card-link btn btn-danger" onClick={DeleteItem}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default Card;
