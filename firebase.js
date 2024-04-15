import firebase from "firebase/compat";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD4CeMThEB27aNgdWaGUJTB0avEIabe7_Y",
    authDomain: "linkz-f38ce.firebaseapp.com",
    projectId: "linkz-f38ce",
    storageBucket: "linkz-f38ce.appspot.com",
    messagingSenderId: "696151350117",
    appId: "1:696151350117:web:2811e5a99c0a01fadc9f8c",
    measurementId: "G-HRTS9W1TV9"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}
const analytics = getAnalytics(app);
const auth = firebase.auth()

export { auth };