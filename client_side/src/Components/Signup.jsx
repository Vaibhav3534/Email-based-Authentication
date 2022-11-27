import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Signup = () => {
    
    const [inputData, setInputData] = React.useState({
        first_name:"",
        last_name:"",
        email:"",
        password:"",
    })
    const data = {
        first_name:"",
        last_name:"",
        email:"",
        password:""
        
    }

    // const [first_name, last_name, email, password] =data

    const handleChange = (e)=>{
        setInputData(
            inputData.e.target.name = e.target.value
        )
        console.log(inputData)
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
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
                        <TextField id="outlined-basic"
                            required
                            name='fisrt_name'
                            // value={first_name}
                            onChange={handleChange}
                            label="First Name" variant="outlined" />
                    </Grid>
                    <Grid xs={5.5}>
                        <TextField id="outlined-basic"
                            required
                            name='last_name'
                            // value={last_name}
                            onChange={handleChange}
                            label="Last Name" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                        <TextField id="outlined-basic"
                            fullWidth
                            required
                            onChange={handleChange}
                            type="email"
                            label="Email" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                        <TextField id="outlined-basic"
                            fullWidth
                            required
                            onChange={handleChange}
                            // minRows={10}
                            type="password"
                            label="Password" variant="outlined" />
                    </Grid>
                    <Button
                        type='submit'
                        onClick={handleSubmit}
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