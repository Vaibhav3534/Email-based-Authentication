import axios from 'axios'
import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import "./style.css"

const Profile = () => {
  const [status, setStatus] = React.useState()
  const navigate = useNavigate()

  // React.useEffect(() => {
  //   getData(token)
  // })

  const token = JSON.parse(localStorage.getItem("token")) || null
  const userData = JSON.parse(localStorage.getItem("userData"))
  console.log("token  " + token)



  const getData = async (token) => {
    console.log("inside getdata")
    const data = await axios.post("https://erin-goldfish-coat.cyclic.app/api/check/auth", { "token": token },)

    console.log(data.data.success)
    setStatus(data.data.success)
  }


  if (token) {
    try {
      getData(token)
    } catch (error) {
      alert("no")
    }
  }

  const handleLogout = async () => {
    localStorage.removeItem("token")
    localStorage.removeItem("userData")
    toast.success("Logged out successfully")
    setTimeout(() => {
      navigate("/login")
    }, 2000)

  }

  return (
    <Grid
      container
      spacing={2}
      margin="auto"
      width="100vw"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Toaster
        toastOptions={{
          // Define default options
          className: '',
          duration: 1800,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      {
        status ?


          <Grid container spacing={1}
            id="card"
            className='card'
            sx={{
              // width: "50%",
              margin: "auto",
              // padding:"auto",
              // backgroundColor:"whitesmoke",
              boxShadow: "2px 2px 5px 2px rgba(0,0,0,0.2)",
              borderRadius: "8px",
              // height: "50vh",
              // maxWidth: "50%",
              display: "flex",
              // flexDirection:"row",
              justifyContent: "space-between",
              // position:"absolute",
              // marginTop:"10px",
              padding: "20px"
            }}>

            <Grid xs={12} >
              <h3>Name - {userData.name}</h3>
            </Grid>
            <Grid xs={12} >
              <h3>Email - {userData.email}</h3>
            </Grid>

            <Grid xs={12} fullWidth>
              <Button
                // type='submit'
                onClick={handleLogout}
                variant="contained"
                fullWidth
                disableElevation>
                Logout
              </Button>
            </Grid>

          </Grid>
          :

          <Grid container spacing={1}
            sx={{
              width: "50%",
              margin: "auto",
              // padding:"auto",
              // backgroundColor:"whitesmoke",
              boxShadow: "2px 2px 5px 2px rgba(0,0,0,0.2)",
              borderRadius: "8px",
              // height: "50vh",
              maxWidth: "50%",
              display: "flex",
              // flexDirection:"row",
              justifyContent: "space-between",
              // position:"absolute",
              // marginTop:"10px",
              padding: "20px"
            }}>

            <Grid xs={12} >
              <h2>You are not authorised, Please login...</h2>
            </Grid>


            <Grid xs={12} fullWidth>
              <Button
                // type='submit'
                onClick={() => { navigate("/login") }}
                variant="contained"
                fullWidth
                disableElevation>
                Login
              </Button>
            </Grid>

          </Grid>

      }
    </Grid>
  )

}

export default Profile
