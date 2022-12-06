import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { AuthContext } from './AuthContext/AuthContext';
import toast, { Toaster } from "react-hot-toast"

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [isLoggedin, setIsloggedin]= useState(false)


    const navigate = useNavigate()
    const initialData = {
        email: "",
        password: ""
    }
    const [formData, setFormData] = React.useState(initialData)


    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
        console.log(formData)
    }


    const handleLogin = async (e) => {
        e.preventDefault()

        setLoading(true)
        const data = await axios.post("http://localhost:8080/auth/login", formData, { withCredentials: true })
        setLoading(false)

        if(data.data.token){
            localStorage.setItem("token", JSON.stringify(data.data.token))
        }
        
        console.log(data.data.user)
        if (data.data.success) {
            setIsloggedin(true)
            setTimeout(() => {
                
            }, 2000)
            
            toast.success(data.data.message)

        } else {
            toast.error(data.data.message)
        }
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
            <Toaster />
            <form onSubmit={handleLogin} style={{ "margin": "auto" }}>
                <Grid container spacing={2}
                    sx={{
                        width: "50%",
                        margin: "auto",
                        // padding:"auto",
                        // backgroundColor:"whitesmoke",
                        boxShadow: "2px 2px 5px 2px rgba(0,0,0,0.2)",
                        borderRadius: "8px",
                        height: "50vh",
                        display: "flex",
                        // flexDirection:"row",
                        justifyContent: "space-between",
                        // position:"absolute",
                        // marginTop:"10px",
                        padding: "20px"
                    }}>


                    <Grid xs={12}>
                        <TextField id="outlined-basic"
                            fullWidth
                            required
                            name='email'
                            // value={email}
                            onChange={handleChange}
                            type="email"
                            label="Email" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                        <TextField id="outlined-basic"
                            fullWidth
                            required
                            name='password'
                            // value={password}
                            onChange={handleChange}
                            // minRows={10}
                            type="password"
                            label="Password" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            type='submit'
                            variant="contained"
                            fullWidth
                            disableElevation>
                            Login
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Grid>
    )
}


export default Login