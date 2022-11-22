import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'

function Profile() {
  const {currentUser} = useContext(AuthContext)
  
  return (
    <>
      <div style={{marginTop:'7rem'}}>{JSON.stringify(currentUser)}</div>
    </>
  )
}

export default Profile