import React from 'react'
import toast, { Toaster } from 'react-hot-toast'
import {usePromiseTracker} from "react-promise-tracker"
// import {FadeLoader} from "react-loader-spinner"
import {FadeLoader} from "react-spinners"
import {CircularProgress} from "react-loading-indicators"

const Loadind = () => {
    const {promiseInProgress} = usePromiseTracker()
    
  return (
    <div>{(promiseInProgress ===true)? <CircularProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" /> : null}</div>
  )
}

export default Loadind