import firebase from "firebase/app";

import "firebase/auth";

import "firebase/firestore";

import "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAk_gh4qKLkxluMIM9Mu8OMZjdKHOTHodg",
	authDomain: "transfer-app-912ae.firebaseapp.com",
	projectId: "transfer-app-912ae",
	storageBucket: "transfer-app-912ae.appspot.com",
	messagingSenderId: "261458936776",
	appId: "1:261458936776:web:d03d3f03940b41cfbd76fd",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const storage = firebase.storage();

const storageRef = storage.ref();

const db = firebase.firestore();

db.settings({
	timestampsInSnapshots: true,
});

export { auth, provider, storage, db, storageRef };

export default firebase;
