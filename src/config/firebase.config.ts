import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
// import { getDatabase } from "firebase/database";
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyA7kqF1jlmC3Ltu59GqNWSiSdydsOm0wKA',
  authDomain: 'genius-car-661ce.firebaseapp.com',
  projectId: 'genius-car-661ce',
  storageBucket: 'genius-car-661ce.appspot.com',
  messagingSenderId: '132141555667',
  appId: '1:132141555667:web:910329dbc9549461fd5926',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const storage = getStorage(app)
const db = getFirestore(app)

export { auth, db, storage }
