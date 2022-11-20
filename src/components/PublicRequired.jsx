import React, { useContext } from 'react'
import { Navigate,useLocation } from 'react-router-dom'
import { AuthContext } from '../context/Auth.Context'

function PublicRequired({children}) {
    const currentUser = useContext(AuthContext)
    const location = useLocation()
    const navigate = currentUser ? <Navigate to={location?.state?.from ? location?.state?.from : '/profile'} /> : children
    return (
      <>{navigate}</>
    )
}

export default PublicRequired