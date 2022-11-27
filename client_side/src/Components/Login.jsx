import React from 'react'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const Login = () => {
    const [inputData, setInputData] = React.useState({
        email:"",
        password:"",
    })

    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("");

    // const [email, password] = inputData


    const handleChange = (e)=>{
        setInputData(e.target.value)
        console.log(inputData)
    }

    const handleLogin =(e)=>{
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
                            value={email}
                            onChange={handleChange}
                            type="email"
                            label="Email" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                        <TextField id="outlined-basic"
                            fullWidth
                            required
                            name='password'
                            value={password}
                            onChange={handleChange}
                            // minRows={10}
                            type="password"
                            label="Password" variant="outlined" />
                    </Grid>
                    <Grid xs={12}>
                    <Button
                        type='submit'
                        onClick={handleLogin}
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