import React from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLocation,Navigate, Outlet } from 'react-router-dom'
import { replace } from 'formik'

const RequireAuth = () => {
    const {usr} = useAuthContext()
    const location = useLocation()
  return (
   <>
      {
        usr?.accessToken?
           <Outlet/>
        : <Navigate to='/login' state={{from:location}} replace/>
      }
   </>
  )
}

export default RequireAuth