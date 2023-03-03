import { initializeApp } from "firebase/app";
import{getFirestore} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBucFJzkUB-S3aH435uMw6sVgcEx8A8RKo",
    authDomain: "aliarg-c6eec.firebaseapp.com",
    projectId: "aliarg-c6eec",
    storageBucket: "aliarg-c6eec.appspot.com",
    messagingSenderId: "118354038114",
    appId: "1:118354038114:web:2b51154956ed42b67f703b"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

