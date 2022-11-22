import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, getDoc,onSnapshot, getDocs,collection,query, doc, addDoc, updateDoc, deleteDoc, where, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCqQoKEUOJFQh56KBdM59hLNYBeuK0xDlU",
  authDomain: "fir-auth-aa01d.firebaseapp.com",
  projectId: "fir-auth-aa01d",
  storageBucket: "fir-auth-aa01d.appspot.com",
  messagingSenderId: "964882280519",
  appId: "1:964882280519:web:d268bf6b75fce7af37c162"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)

// set up database(or connection)
const db = getFirestore(app)
export const notesColRef = collection(db,'notes')

// simple database(for all data)(after browser reload we can see only update data if server data is changed)
// getDocs(notesColRef)
//   .then(snapshot => {
//     const notes = []
//     snapshot.docs.forEach(doc => {
//       notes.push({
//         ...doc.data(),
//         id:doc.id
//       })
//     })
//   })


// realtime (for all document) documents comes from server(firebase)
  // onSnapshot(notesColRef,snapshot => {
  //   const notes = []
  //   snapshot.docs.forEach(doc => {
  //     notes.push({
  //       ...doc.data(),
  //       id:doc.id
  //     })
  //   })
  //   console.log(notes)
  // })


  // single document data retrieve according to simple database
  // const docRef = doc(notesColRef,'mhNWzbQZUAHtl1WHb0lM')
  // getDoc(docRef)
  //    .then(doc => {
  //      console.log(doc.data())
  //    }).catch(err => {
    //     console.log(err)
    //   })


// realtime (single document) data comes from server(firebase)

// const docRef = doc(notesColRef,'mhNWzbQZUAHtl1WHb0lM')
// onSnapshot(docRef)
//    .then(doc => {
//      console.log(doc.data())
//    }).catch(err => {
//      console.log(err)
//    })


// document add 
// addDoc(notesColRef, {
//   title:'title from vscode',
//   description:'description from vscode',
//   user:{
//     id:'4564',
//     name:'vscode'
//   }
// })


// update document
// const docRef = doc(notesColRef,'mhNWzbQZUAHtl1WHb0lM')
// updateDoc(docRef,{
//   title:'sample note',
//   'user.name':'harun-2'
// })


// delete document
// const docRef = doc(notesColRef,'mhNWzbQZUAHtl1WHb0lM')
// deleteDoc(docRef).then(() => {
//   console.log('document deleted successfully')
// })


// search query(search documents)
// const quiredData = query(notesColRef,where('title','==','title from vscode'))
// getDocs(quiredData)
//   .then(snapshot => {
//     const notes = []
//     snapshot.docs.forEach(doc => {
//       notes.push({
//         ...doc.data(),
//         id:doc.id
//       })
//     })
//     console.log(notes)
//   })




// document(like an object)
// {
//   title : 'web',
//   description:'web des',
//   user:{
//     name:'harun'
//   }
// }

// collection (like an array object and consist of many document)
// const stores = [
//   {
//     title : 'web',
//     description:'web des',
//     user:{
//       name:'harun'
//     }
//   },
//   {
//     title : 'web',
//     description:'web des',
//     user:{
//       name:'harun'
//     }
//   },

// ]