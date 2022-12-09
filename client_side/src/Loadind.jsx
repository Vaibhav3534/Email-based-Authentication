import React from 'react'
import {usePromiseTracker} from "react-promise-tracker"
// import {FadeLoader} from "react-loader-spinner"
import {CircularProgress} from "react-loading-indicators"

const Loadind = () => {
    const {promiseInProgress} = usePromiseTracker()
    
  return (
    <div>{(promiseInProgress ===true)? <CircularProgress variant="dotted" color="#1976d2" size="small" text="Checking" textColor="" /> : null}</div>
  )
}

export default Loadind