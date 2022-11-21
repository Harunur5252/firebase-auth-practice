import React, { useContext } from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { AuthContext } from '../context/Auth.Context'

function PublicRequired({children}) {
    const {currentUser,loading} = useContext(AuthContext)
    const location = useLocation()
    if(loading){
       if(currentUser){
         return <Navigate to={location?.state?.from ? location?.state?.from : '/profile'} />
       }else{
         return children
       }
    }else{
      return 'loading...'
    }
}

export default PublicRequired