// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// IMPORT THE FUNCTION TO PULL IN THE FIREBASE REALTIME DATABASE SERVICE:
import { getDatabase } from 'firebase/database';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJXnASEFU_ksf_Tl2JzYQczzUwhuop4D0",
    authDomain: "phishing-net.firebaseapp.com",
    projectId: "phishing-net",
    storageBucket: "phishing-net.appspot.com",
    messagingSenderId: "509514283754",
    appId: "1:509514283754:web:798289be7a03d5d6b27593"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// GO GET THE REALTIME DATABASE SERVICE
const realtime = getDatabase(app);

export default realtime;