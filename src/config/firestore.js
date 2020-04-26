import * as firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

// const functions = require("firebase-functions")

// admin.initializeApp(functions.config().firebase)
const firebaseConfig = {
  apiKey: "AIzaSyAjb5X66FCCmt06aMoNQo5FY2-66Tp8pzQ",
  authDomain: "kivaru.firebaseapp.com",
  databaseURL: "https://kivaru.firebaseio.com",
  projectId: "kivaru",
  storageBucket: "kivaru.appspot.com",
  messagingSenderId: "66445620246",
  appId: "1:66445620246:web:b14633bb6e7885bea5b137",
  measurementId: "G-T7NQJP22NC",
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
// .settings({
//   cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
// })
// db.settings({ persistence: false })

export const auth = firebase.auth()
export const storage = firebase.storage()

export default db
