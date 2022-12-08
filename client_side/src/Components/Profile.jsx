import axios from 'axios'
import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const [status, setStatus] = React.useState()
  const navigate = useNavigate()

  // React.useEffect(() => {
  //   if(!status)
  //   navigate("/register")
  // },[status])

  const token = JSON.parse(localStorage.getItem("token"))
  const userData = JSON.parse(localStorage.getItem("userData"))
  console.log("token  " + token)

  const getData = async (token) => {
    const data = await axios.post("/check", { "token": token },)

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
    navigate("/login")
  }

  return (
    <section>
      {
        status?

          <Grid
            container
            spacing={2}
            margin="auto"
            maxWidth="50%"
            minWidth="800px"

            justifyContent="center"
            style={{ minHeight: '100vh' }}
          >
            {/* <h2>hello</h2> */}
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


              <Grid xs={12} sx={{ display: "flex", }}>
                <Grid xs={2.5} ><h3>Name : </h3></Grid>
                <Grid xs={9.5} ><h4>{userData.name}</h4></Grid>
              </Grid>
              <Grid xs={12} sx={{ display: "flex", alignContent: "space-between", margin: "auto", }}>
                <Grid xs={2.5} ><h3>Email : </h3></Grid>
                <Grid xs={9.5}><h4>{userData.email}</h4></Grid>
              </Grid>
              <Grid xs={12}>
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

          </Grid>

          
      :
          <Box>
            <h2>You are not authorised, Please login...</h2>
            <Button onClick={() => { navigate("/login") }}>Login</Button>
          </Box>
      }
      
    </section>
  )

}

export default Profile
