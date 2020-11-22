import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCfR3joOErA5BFp1kTaU6-TaX8mZ3gbOjY',
  authDomain: 'bookclub-25b96.firebaseapp.com',
  databaseURL: 'https://bookclub-25b96.firebaseio.com/',
  projectId: 'bookclub-25b96',
  storageBucket: 'bookclub-25b96.appspot.com',
  messagingSenderId: '905900361561',
  appId: '1:905900361561:android:b73526c37080d20ee2ae48',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };