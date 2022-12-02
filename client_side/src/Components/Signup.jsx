import React from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios"
import {useNavigate} from "react-router-dom"

import toast, {Toaster} from "react-hot-toast"




const Signup = () => {
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    }



    const [inputData, setInputData] = React.useState(initialState)
    // const [status, setStatus] = React.useState(false)

    const navigate = useNavigate()



    // React.useEffect(()=>{
    //     if(status==true){
    //         navigate("/login")
    //     }
    // }, [status])

    React.useEffect(()=>{
        // console.log(inputData)
    })

    const handleChange = (e) => {
        const { name, value } = e.target

        if (e.target.value !== "") {
            setInputData({
                ...inputData, [name]: value
            })
        }

        // console.log(inputData)
    }

    const fetch = async(inputData)=>{
        await axios.post("http://localhost:8080/auth/register", inputData)
    //     .then((res) => {
    //                 // console.log(res)
    //                 // return alert(res.data.message)
    //                 if(res.data.message== "Email already Registered"){
    //                     // alert(res.data.message)
                        
    //                     navigate("/login")
    //                 }else{
    //                     // alert(res.data.message)
    //                     toast.success("Registration Successful, Please verify Email")
    //                     // setStatus(true)
    //                 }

    //                 setStatus(res.data.success)
    //             })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { email, password, first_name, last_name } = inputData
        console.log("test")
        if (email !== "" && password !== "" && first_name !== "" && last_name !== "") {
            await axios.post("http://localhost:8080/auth/register", inputData)
                .then((res) => {
                    console.log(res)
                    // return alert(res.data.message)
                    
                    if(res.data.message === "Email already Registered"){
                        toast("hello")
                        alert(res.data.message)
                        
                        console.log("first")
                        navigate("/login")
                    }else{
                        // alert(res.data.message)
                        toast.success("Registration Successful, Please verify Email")
                        // setStatus(true)
                    }

                    // setStatus(res.data.success)
                })

                // await toast.promise( fetch(inputData), {
                //     loading:`Registering...Please wait`,
                //     success:(data) =>( `Registered successfully...Please verify email`),
                //     error: "Error when fetching",
                //   },
                //   {
                //     style: {
                //       minWidth: '250px',
                //     },
                //     success: {
                //       duration: 3000,
                //       icon: '🔥',
                //     },
                //   });
                
                e.target.reset()
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
        <Toaster/>
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
                    
                    <Button
                        type='submit'
                        // onClick={handleSubmit}
                        variant="contained"
                        fullWidth
                        disableElevation>
                        Sign Up
                    </Button>
                    

                </Grid>
            </form>
        </Grid>
    )
}

export default Signup