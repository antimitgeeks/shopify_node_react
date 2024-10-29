import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDevJruUsLFlDReZdwwGnFt_X9w3b7Ytak",
    authDomain: "mobilifyweb-10638.firebaseapp.com",
    projectId: "mobilifyweb-10638",
    storageBucket: "mobilifyweb-10638.appspot.com",
    messagingSenderId: "499853515315",
    appId: "1:499853515315:web:4c6ba87756fd4b68452146",
    measurementId: "G-247T17DBDH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };