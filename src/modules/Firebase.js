import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyBpGsPJcfsHiSKgI-JTKHsWfLF7ql8XcpI",
  authDomain: "prattle-bde0b.firebaseapp.com",
  databaseURL: "https://prattle-bde0b.firebaseio.com",
  projectId: "prattle-bde0b",
  storageBucket: "prattle-bde0b.appspot.com",
  messagingSenderId: "891177641423"
};
const Firebase = firebase.initializeApp(config);

export default Firebase.firebase_;
