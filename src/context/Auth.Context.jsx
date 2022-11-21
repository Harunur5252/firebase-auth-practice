import { createContext, useState,useEffect } from "react";
import {auth} from '../utils/firebase.config'
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext()


export const AuthProvider = ({children}) => {
  const [currentUser,setCurrentUser] = useState(null)
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
        setCurrentUser(user)
        setLoading(true)
    })
  },[])

  const value = {
    loading,
    currentUser
  }

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  ) 
}

