import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseConfig = {
  apiKey: "AIzaSyApLyDcnfnvRndc7qfcgzX84084L0YyWiI",
  authDomain: "vcms-jjs.firebaseapp.com",
  databaseURL: "https://vcms-jjs.firebaseio.com",
  projectId: "vcms-jjs",
  storageBucket: "vcms-jjs.appspot.com",
  messagingSenderId: "248990031157",
  appId: "1:248990031157:web:de8187654141dbcef8c07c",
  measurementId: "G-0Q9SWGSH2S"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)

}


//export default firebase;
//initialize services
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth();
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, projectStorage, timestamp }

