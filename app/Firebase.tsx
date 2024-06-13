import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY as string,
	authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN as string,
	projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID as string,
	storageBucket: process.env
		.NEXT_PUBLIC_REACT_APP_FIREBASE_STRAGE_BUCKET as string,
	messagingSenderId: process.env
		.NEXT_PUBLIC_REACT_APP_FIREBASE_MASSAGING_SENDER_ID as string,
	appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID as string,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
