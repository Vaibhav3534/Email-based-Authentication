import express from "express";
import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs"
import nodemailer from "nodemailer"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken"
import otpGenerator from "otp-generator"

dotenv.config()
const authRouter = express.Router()

authRouter.use(cookieParser())

const User = userModel

// Creating Register user API
authRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCheck = await User.exists({ email: email })

        if (userCheck) {
            // throw new Error('User already exists')
            return res.status(201).send({ success: false, message: "Email already Registered" })
        }

        const user = User(req.body);

        const encryptedPassword = await bcrypt.hash(password, 12)

        user.password = encryptedPassword

        // const token = await user.generateAuthToken()
        console.log(user._id)
        await user.save()

        console.log("first")
        await sendVerifyMail(user.first_name, user.email, user._id.toJSON())

        return res.status(201).send({ success: true, message: "Registered successfully. Please check your mail" })

    } catch (error) {
        console.log(error)
        return res.send(error.message)
    }
})


// Creating Login Api 
authRouter.post("/login", async (req, res) => {
    console.log("Entered login api")
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })
        console.log(user)

        if (!user) {
            console.log("No user found")
            return res
                .status(201)
                .send({ success: false, message: "User not registered! Please Register" })
        }

        if (!user.verified) {
            return res
                .status(202)
                .send({ success: false, message: "Email not verified" })
        }
        if (await validatePassword(password, user.password) === true && user.verified == true) {
            console.log("About to generate token")
            const token = generateAuthToken((user._id).toJSON());
            console.log("Generated token and exited login api")
            
            const userData = {
                name: `${user.first_name} ${user.last_name}`,
                email: user.email
            }
            return res
                .cookie("token", token, {
                    maxAge: 2 * 60 * 60 * 1000,
                    httpOnly: true,
                })
                .status(201)
                .send({ success: true, token: token, message: "Login successfull", user:userData})
        }else{
            return res.status(201).send({success:false, message:"Wrong password"})
        }

    } catch (error) {
        console.log(error)
        res.status(201).send(error.message)
    }
})

authRouter.post("/forgotpassword/sendotp", async(req, res)=>{
    try {
        const{email} = req.body
        const user = await User.findOne({email:email})

        if(!user){
            res
                .status(201)
                .send({success:false, message:"User not found"})
        }

        const otp = otpGenerator.generate(6, 
            {  specialChars:false,
                digits:true,
                lowerCaseAlphabets:false,
                upperCaseAlphabets:false
             })

        console.log(otp)
        
        await sendOtp(user.first_name, email, otp)

        res.status(201).send({success:true,otp:otp, message:"OTP sent"})

    } catch (error) {
        console.log(error)
        res.send(error.message)
    }
})

authRouter.post("/forgotpassword/update", async(req, res)=>{
    try {
        
        const {email, password, cPassword} = req.body.inputData;
        console.log(email)
        const user = await User.findOne({email:email})

        if(!user){
            return res
                    .status(201)
                    .send({success: false, message:"User not found"})
        }

        if(password !== cPassword){
            return res
                    .status(201)
                    .send({success:false, message:"Password do not match"})
        }

        const encryptedPassword = await bcrypt.hash(password, 12)
        user.password = encryptedPassword

        await user.save()
        console.log("ended")

        return res
                .status(201)
                .send({success: true, message:"Password updated"})
                

    } catch (error) {
        console.log(error.message)
        return res.status(501).send({success:false, message:"Internal server error"})
    }
})


//Function to create Token for Aurhorization
const generateAuthToken = function (user) {
    const token = jwt.sign({ user }, process.env.SECRETE_KEY, {
        expiresIn: "60s"  //validity of JWT token
    })

    return token;
}


//Function to validate the Hashed Password
async function validatePassword(password, hashed) {
    return await bcrypt.compare(password, hashed)
}


//Funtion to Send Verification Mail to User
const sendVerifyMail = async (name, email, id) => {
    console.log(id)
    try {

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: 'teamxrsmokie@gmail.com',
                pass: process.env.G_APP_PASSWORD
            }
        });

        const mail = {
            from: "teamxrsmokie@gmail.com",
            to: email,
            subject: "VERIFICATION MAIL",
            text: `Hi ${name} this is a verification mail`,
            html: `<h1> Hi ${name}, Please click here to <a  href="https://erin-goldfish-coat.cyclic.app/api/auth/verify?id=${id}" target="_blank">Verify</a> your mail</h1>`
        }

        const info = await transporter.sendMail(mail)
        console.log(info.response)

    } catch (error) {
        console.log(error)
        res.send(err)
    }
}

const sendOtp = async(name, email, otp)=>{
    try {
        const transporter = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth:{
                user:"teamxrsmokie@gmail.com",
                pass:process.env.G_APP_PASSWORD
            }
        })

        const mail ={
            from:"teamxrsmokie@gmail.com",
            to:email,
            subject:"OTP to reset password",
            html:`<p>Hi <span><h3>${name}</h3></span> your OTP to reset password is<h1> ${otp} </h1></p>`
        }
        await transporter.sendMail(mail)
        

    } catch (error) {
        res.send(error)
    }
}


//API to verify mail and render webpage
authRouter.get("/verify", async (req, res) => {
    try {
        console.log(req.query.id)
        const updatedData = await User.updateOne({ _id: req.query.id }, { $set: { verified: true } })
        console.log(updatedData)
        res.render("verifiedEmail")

    } catch (error) {
        console.log(error)
    }
})

export default authRouter
export {sendVerifyMail}

