import firebase from 'firebase/app';
import 'firebase/auth';

firebase.initializeApp({
    apiKey: "AIzaSyB_amf0M3yKPHisunpXBRJ9geS83R5dye0",
    authDomain: "pdg-remotto.firebaseapp.com",
    projectId: "pdg-remotto",
    storageBucket: "pdg-remotto.appspot.com",
    messagingSenderId: "1062022044458",
    appId: "1:1062022044458:web:df821ad5eaa7255e435c53",
    measurementId: "G-GJRZEJNN4V"
  });

  const auth = firebase.auth();