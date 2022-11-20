import React, { useContext } from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { AuthContext } from '../context/Auth.Context'

function AuthRequired({children}) {
    const currentUser = useContext(AuthContext)
    const location = useLocation()
    if(currentUser){
       return children
    }else{
      return <Navigate to='/login' state={{from : location.pathname}} />
    }
}

export default AuthRequired