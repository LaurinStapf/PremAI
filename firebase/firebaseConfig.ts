import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDa9ZYX4zQJVbRc6dAQKd4nC_-7WjWHLD0",
  authDomain: "premai-c538f.firebaseapp.com",
  databaseURL:
    "https://premai-c538f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "premai-c538f",
  storageBucket: "premai-c538f.appspot.com",
  messagingSenderId: "960651285546",
  appId: "1:960651285546:web:fd8a0808477576d6289f53",
  measurementId: "G-CFC88YLSKQ",
};

// export auth in firebaseConfig

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
