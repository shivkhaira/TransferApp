import React, { useState } from "react";

import { useSelector } from "react-redux";

import { selectUser } from "../../features/user/userSlice";

import { fileUpload } from "../../config/storeData";

import "./Content.css";

const Content = () => {
	const user = useSelector(selectUser);

	const [file, setFile] = useState();

	const [name, setName] = useState("");

	const [uploadText, setUpload] = useState("Upload");

	const [progress, setProgress] = useState(0);

	const changeProgress = (val) => {
		setProgress(val);
	};

	const upload = async () => {
		setProgress(0);
		setUpload("Uploading");
		try {
			await fileUpload(user.uid, file, name, changeProgress);
			setName("");
			setUpload("Upload");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<div className="row">
				<div className="col-md-6">
					<div className="form-group">
						<label>Caption</label>
						<input
							className="form-control"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</div>
					<div className="form-group">
						<label>File</label>

						<input
							type="file"
							className="form-control"
							onChange={(e) => setFile(e.target.files[0])}
						/>
					</div>
					<br />
					<div className="form-group text-center">
						<button className="btn btn-lg btn-success" onClick={upload}>
							{uploadText}
						</button>
					</div>

					<h6>Upload Progress</h6>

					<div className="w3-border mt">
						<div
							className="w3-blue"
							style={{ height: "24px", width: progress + "%" }}
						></div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Content;
