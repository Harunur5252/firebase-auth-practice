import { createContext, useState,useEffect } from "react";
import {auth} from '../utils/firebase.config'
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
  const [currentUser,setCurrentUser] = useState(null)
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setCurrentUser(user)
    })
  },[])
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  ) 
}

