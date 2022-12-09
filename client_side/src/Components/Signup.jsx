import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
import { useNavigate } from "react-router-dom"

import toast, { Toaster } from "react-hot-toast"
import { duration } from '@mui/material';
import { check } from "express-validator"
import { trackPromise } from "react-promise-tracker"
import Loadind from '../Loadind';




const Signup = () => {
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    }



    const [inputData, setInputData] = React.useState(initialState)
    const [status, setStatus] = React.useState(false)

    const navigate = useNavigate()

    // React.useEffect(() => {
    //     // console.log(inputData)
    // })

    const handleChange = (e) => {
        const { name, value } = e.target

        if (e.target.value !== "") {
            setInputData({
                ...inputData, [name]: value
            })
        }

        // console.log(inputData)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password, first_name, last_name } = inputData
        console.log("test")
        if (password.length < 6) {
            toast.error("Passwotrd must be min 6 char")
            return
        }
        if (email !== "" && password !== "" && first_name !== "" && last_name !== "") {

            try {
                // toast.loading("please wait...")
                setStatus(true)
                console.log(status)
                const data = await trackPromise(
                    axios.post("https://erin-goldfish-coat.cyclic.app/api/auth/register", inputData))
                // toast.loading()

                setStatus(false)
                console.log(status)

                // console.log(data)
                if (data.data.success) {
                     toast.success(data.data.message)

                    setTimeout(() => {
                        navigate("/login")
                    }, 2000)

                }
                else {
                    console.log("error")
                    toast.error(data.data.message)
                }
                e.target.reset()
            } catch (error) {
                console.log(error)
                toast.error(error)
            }


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
            {/* <Toaster/> */}
            <Toaster containerStyle={{marginTop:"50px"}}/>
            <div style={{"position":"absolute", "marginTop":"100px"}}><Loadind/></div>
            
            
            <form onSubmit={handleSubmit} style={{ "margin": "auto" }}>
            
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
                    
                    <Grid xs={5.5} >
                        <TextField id="outlined-basic1"
                            required
                            name='first_name'
                            // value={first_name}
                            onChange={handleChange}
                            label="First Name" variant="outlined" />
                    </Grid>
                    <Grid xs={5.5}>
                        <TextField id="outlined-basic2"
                            required
                            name='last_name'
                            // value={last_name}
                            onChange={handleChange}
                            label="Last Name" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                        <TextField id="outlined-basic3"
                            fullWidth
                            required
                            onChange={handleChange}
                            name="email"
                            type="email"
                            label="Email" variant="outlined" />
                    </Grid>

                    <Grid xs={12}>
                        <TextField id="outlined-basic4"
                            fullWidth
                            required

                            onChange={handleChange}
                            // minRows={10}
                            name="password"
                            type="password"
                            label="Password" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                        <Button
                            type='submit'
                            // onClick={handleSubmit}
                            variant="contained"
                            fullWidth
                            disableElevation>
                            Sign Up
                        </Button>
                    </Grid>
                    {/* <p>Already have account</p> */}
                    <Grid xs={12}>
                        <Button
                            onClick={() => {
                                navigate("/login")
                            }}
                            variant="contained"
                            fullWidth
                            disableElevation>
                            Click to Login
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

export default Signup