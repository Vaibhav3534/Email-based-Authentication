import React from 'react'
import { toast } from 'react-hot-toast'
import { Navigate, useNavigate } from 'react-router-dom'

function PrivateRoute ({child}){
    // const navigate = useNavigate()

    const isAuth = true
    console.log("first")
    if(!isAuth){
      return (
        <div>
        {/* {toast.error("Please Login.vro..")} */}
        
            <h1>You are not authorized</h1>
            </div>
      )
    }
    return child
  }

export default PrivateRoute