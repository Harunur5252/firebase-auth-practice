import React, { useContext } from 'react'
import { AuthContext } from '../context/Auth.Context'

function Profile() {
  const currentUser = useContext(AuthContext)

  return (
    <>
      <div>{JSON.stringify(currentUser)}</div>
    </>
  )
}

export default Profile