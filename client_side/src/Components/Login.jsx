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
import { trackPromise } from "react-promise-tracker"
import Loadind from '../Loadind';
import { IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FormDialog from './ForgotPassword';
import "./style.css"
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [isLoggedin, setIsloggedin] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const dispatch = useDispatch()

    const isAuth = useSelector((store)=>store.auth)

    console.log("just entered login function  "+ isAuth)
    const navigate = useNavigate()
    const initialData = {
        email: "",
        password: ""
    }


    const [formData, setFormData] = React.useState(initialData)


    const handleChange = (e) => {
        const { value, name } = e.target;
        setFormData({ ...formData, [name]: value })
        // console.log(formData)
    }


    const handleLogin = async (e) => {
        e.preventDefault()

        setLoading(true)
        try {
            if (formData.password.length < 6) {
                return toast.error("Password must be min 6 char")
            }
            console.log("test")
            const data = await trackPromise(axios.post("https://erin-goldfish-coat.cyclic.app/api/auth/login", formData,))

            setLoading(false)

            if (data.data.token) {
                localStorage.setItem("token", JSON.stringify(data.data.token))
                localStorage.setItem("userData", JSON.stringify(data.data.user))
            }

            // console.log(data.data.user)

            if (data.data.success) {
                setIsloggedin(true)
                dispatch({type:"LOGIN"})
                toast.success(data.data.message, {
                    style: { color: "white" }
                })
                setTimeout(() => {
                    navigate("/profile")
                }, 2000)



            } else {
                toast.error(data.data.message, {
                    style: { color: "white", backgroundColor: "black" }
                })
            }
        } catch (error) {
            toast.error("error")
            console.log(error.message)
        }
    }

    // const handleForgotPassword = () => {

    // }

    const handleMouseLeave = () => {
        setShowPassword(false)
    }

    const handleMouseEnter = () => {
        setShowPassword(true)
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
            {/* <Navbar /> */}
            <Toaster
                containerStyle={{ marginTop: "50px", }}
                toastOptions={{
                    className: '',
                    style: {
                        border: '2px solid #1976d2',
                        // padding: '16px',
                        color: '#FFFFFF',
                        textDecorationColor: "white"
                    },
                    success: {
                        iconTheme: {
                            primary: 'green',
                            secondary: 'white',
                        },
                        style: {
                            color: "white",
                            backgroundColor: "black"
                        }
                    },
                    error: {
                        iconTheme: {
                            primary: 'red',
                            secondary: 'white',
                        },
                        style: {
                            color: "white",
                            backgroundColor: "black"
                        }
                    }
                }}
            />

            <div style={{ "position": "absolute", "marginTop": "100px" }}><Loadind /></div>

            <form onSubmit={handleLogin}  style={{ "margin": "auto" }}>
                <Grid container spacing={2}
                    className="card"
                    id="card"
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
                        <TextField id="outlined-basic-2"
                            fullWidth
                            required
                            name='password'
                            // value={password}
                            onChange={handleChange}
                            // minRows={10}
                            type={showPassword ? "text" : "password"}
                            label="Password" variant="outlined"
                            InputProps={{
                                endAdornment:
                                    // type ? "password" (
                                    <InputAdornment position='end' sx={{ "backgroundColor": "rgb(232, 240, 254)" }}>
                                        <IconButton sx={{ "backgroundColor": "rgb(232, 240, 254)" }}
                                            onMouseEnter={handleMouseEnter}
                                            onMouseLeave={handleMouseLeave}
                                            edge="end"
                                        >
                                            {!showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                // ): null
                            }}
                        />
                        {/* <Button variant="text" 
                                size='small'
                                onClick={handleForgotPassword}
                                >
                            Forgot password
                        </Button> */}
                        {/* <FormDialog /> */}
                        <Button onClick={()=>navigate("/forgotpassword")}>
                            Forgot Password
                        </Button>


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
                    <Grid xs={12}>
                        <Button
                            onClick={() => {
                                navigate("/register")
                            }}
                            variant="contained"
                            fullWidth
                            disableElevation>
                            Click to Signup
                        </Button>
                    </Grid>

                </Grid>
            </form>
        </Grid>
    )
}


export default Login