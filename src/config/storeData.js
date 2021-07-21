import { storage, db } from "./firbase";

import firebase from "firebase/app";

import randomstring from "randomstring";

const addData = async (collection, data) => {
	await db.collection(collection).add(data);
};

const getRandom = () => {
	return randomstring.generate(8);
};

const fileUpload = async (uid, file, caption, changeProgress) => {
	let fileName = getRandom();

	let fileExt = file.name.split(".").pop();

	let name = fileName + "." + fileExt;

	var upload = storage.ref(`/files/${uid}/${name}`).put(file);

	upload.on("state_changed", function (snapshot) {
		var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		changeProgress(progress);
	});

	addData(uid, {
		name: name,
		caption: caption,
		created_at: firebase.firestore.Timestamp.fromDate(new Date()),
	});
};

export { addData, fileUpload };
