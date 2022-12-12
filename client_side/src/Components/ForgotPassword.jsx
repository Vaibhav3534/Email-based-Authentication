import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControl } from '@mui/material';
import Grid from '@mui/material/Grid';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { MuiOtpInput } from "mui-one-time-password-input"
import { trackPromise } from "react-promise-tracker"
import Loadind from '../Loadind';
import { useNavigate, redirect } from 'react-router-dom';


export default function FormDialog() {
    const [open, setOpen] = React.useState(true);
    const [otp, setOtp] = React.useState("")
    const [otpSuccess, setOtpSuccess] = React.useState(false)
    const [inputData, setInputData] = React.useState({
        email: "",
        password: "",
        cPassword: "",

    })

    const navigate = useNavigate()

    // window.onload= localStorage.removeItem("otp")
    

    // React.useEffect(()=>{
    //     console.log(inputData)
    // }, [setInputData])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setInputData({
            ...inputData,
            [name]: value
        })
        console.log(inputData)
    }

    const handleOtpchange = (newValue) => {
        setOtp(newValue)
    }

    //function to check data type of otp
    function matchIsNumeric(text) {
        console.log(text)
        const isNumber = (typeof text) === 'string'
        console.log(isNumber)
        // const isString = matchIsString(text)
        return (isNumber)
            // || (isString && text !== '')) 
            && !isNaN(Number(text))
    }

    const validateChar1 = (value, index) => {
        return matchIsNumeric(value)
    }

    const handleOtpComplete = async (a) => {
        inputData.otp = a
        console.log(inputData)

        const otp = JSON.parse(localStorage.getItem("otp")) || null

        console.log(otp)

        if (otp === inputData.otp) {
            setOtpSuccess(true)
            toast.success("OTP verified")
        } else {
            toast.error("Incorrect OTP")
        }


    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault()
        const { email, password, cPassword, otp } = inputData

        console.log(inputData)
        if (email == "" || password == "" || cPassword == "" || otp == 0 || otp == undefined) {
            return toast.error("Please enter OTP")
        }
        if (password.length < 6) {
            return toast.error("Password should be min 6 chars")
        }
        if (inputData.password !== inputData.cPassword) {
            return toast.error("Password doesn't match")
        }

        try {
            console.log("first")
            const data = await trackPromise(axios.post("https://erin-goldfish-coat.cyclic.app/api/auth/forgotPassword/update", {inputData}))
            console.log(data)
            console.log("hemlo")
            if(data.data.success){
                localStorage.removeItem("otp")
                toast.success(data.data.message)
                
                e.target.reset()
                setTimeout(()=>{
                    navigate("/login")
                }, 2200)
            }else{
                toast.error(data.data.message)
            }

        } catch (error) {
            console.log(error)
            console.log(error.message)
        }
    }

    const handleOTP = async () => {
        try {

            const { email } = inputData
            const data = await trackPromise(axios.post("https://erin-goldfish-coat.cyclic.app/api/auth/forgotpassword/sendotp", inputData))
            // console.log(data.data)
            if (data.data.success) {
                console.log(data.data.otp)

                localStorage.setItem("otp", JSON.stringify(data.data.otp))
                setOtpSuccess(true)
                toast.success(data.data.message)

            } else {
                console.log(data)
                toast.error(data.data.message)
            }
        } catch (error) {
            toast.error("Internal server error")
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
            <div style={{ "position": "absolute", marginTop: "180px" }}><Loadind /></div>
            <Grid open={true} onClose={handleClose} sx={{
                margin: "auto", boxShadow: "2px 2px 5px 2px rgba(0,0,0,0.2)",
                borderRadius: "8px",
            }} >
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

                <DialogTitle>Reset Password</DialogTitle>
                <DialogContent>
                    <DialogActions sx={{ display: "flex", "flexDirection": "row", "alignContent": "space-evenly", "margin": "auto", }}>
                        <form onSubmit={handlePasswordSubmit}>
                            <FormControl

                                sx={{
                                    display: "flex", flexDirection: "column", mt: '2', minWidth: 300, minHeight: 200
                                }}>


                                <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="email"
                                    label="Email Address"
                                    type="email"
                                    name='email'
                                    onChange={handleChange}
                                    // fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="password"
                                    label="New password"
                                    type="password"
                                    name='password'
                                    onChange={handleChange}
                                    // fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    required
                                    autoFocus
                                    margin="dense"
                                    id="cpassword"
                                    label="Confirm password"
                                    type="password"
                                    name='cPassword'
                                    onChange={handleChange}
                                    // fullWidth
                                    variant="standard"
                                />
                                <MuiOtpInput
                                    // aria-disabled={true}
                                    TextFieldsProps={{ disabled: !otpSuccess, size: 'small', placeholder: '-' }}
                                    // aria-current={true}
                                    sx={{ width: 350, paddingTop: "10px", paddingBottom: "10px" }}
                                    value={otp}
                                    typeof="number"
                                    placeholder='otp'
                                    validateChar={validateChar1}
                                    length={6}
                                    onChange={handleOtpchange}
                                    onComplete={handleOtpComplete} />

                                <Button variant='outlined' onClick={handleOTP}>Send OTP</Button>

                                <Button
                                    sx={{ marginTop: 1, }}
                                    fullWidth
                                    variant="contained"

                                    type='submit'
                                    disabled={!otpSuccess}
                                // onSubmit={handlePasswordSubmit}
                                >Update Password</Button>

                            </FormControl>
                        </form>
                    </DialogActions>
                </DialogContent>

            </Grid>

        </Grid>

    );
}