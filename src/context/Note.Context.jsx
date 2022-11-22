import { createContext } from "react";
import { onSnapshot,getDocs,getDoc,doc } from "firebase/firestore";
import { notesColRef } from "../utils/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

export const NoteContext = createContext()

export const NoteProvider = ({children}) => {
    const [notes,setNotes] = useState(null)
    useEffect(() => {
      const unSubscribe =  onSnapshot(notesColRef,(snapshot) => {
           const notes = snapshot.docs.map(doc => {
                return {
                    id:doc.id,
                    ...doc.data()
                }
            })
            setNotes(notes)
      })
      return () => {
        unSubscribe()
      }
    },[])

    const value = {
       notes,
    }
    return (
        <NoteContext.Provider value={value}>{children}</NoteContext.Provider>
    )
}