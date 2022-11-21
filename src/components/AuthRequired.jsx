import React, { useContext } from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { AuthContext } from '../context/Auth.Context'

function AuthRequired({children}) {
    const {currentUser,loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
      if(currentUser){
       return children
      }else{
        return <Navigate to='/login' state={{from : location.pathname}} />
      }
    }else{
      return 'loading...'
    }
    
}

export default AuthRequired