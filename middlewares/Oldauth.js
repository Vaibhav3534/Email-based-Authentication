import express, { response } from "express";
import userModel from "../models/userModel.js";
import brcryt from "bcryptjs"
import bcrypt from "bcryptjs/dist/bcrypt.js";
import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser";




const authRouter = express.Router()
authRouter.use(cookieParser())

const User = userModel

authRouter.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const userCheck = await User.exists({ email: email })

        if (userCheck) {
            // console.log(res.send("hello"))
            throw new Error('User already exists')
            // return res.status(201).send({success:false, message:"Email already Registered"})

        }
        const user = User(req.body);

        const encryptedPassword = await brcryt.hash(password, 12)

        user.password = encryptedPassword

        // const token = await user.generateAuthToken()
        // console.log(token)
        // user.save()

        // sendVerifyMail()
        await sendVerifyMail(user.first_name, user.email, user._id)

        return res.status(201).send({ success: true, message: "Registered successfully" })



    } catch (error) {
        console.log(error)
        return res.send(error.message)
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if (!user) {
            console.log("first")
            return res.status(400).json({ success: false, message: "User not registered! Please Register" })
        }

        if (!user.verified) {
            return res.send({ message: "Email not verified" })
        }
        if (await validatePassword(password, user.password) === true && user.verified == true) {
            const token = generateAuthToken((user._id).toJSON());

            return res
                .status(201)
                .cookie("token", token, {
                    maxAge: 2 * 60 * 60 * 1000,
                    httpOnly: true,
                })
                .send({ success: true, token: token, message: "Login successfull", user: user })
        }


    } catch (error) {
        res.status(201).send(error.message)
    }
})

const generateAuthToken = function (user) {
    const token = jwt.sign({ user }, process.env.SECRETE_KEY, {
        expiresIn: "10s"
    })

    return token;
}

async function validatePassword(password, hashed) {
    return await bcrypt.compare(password, hashed)
}

const sendVerifyMail = async (name, email, id) => {
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
            html: `<h1> Hi ${name}, Please click here to <a  href="http://localhost:8080/verify?id=${id}" target="_blank">Verify</a> your mail</h1>`
        }

        const info = await transporter.sendMail(mail)

        console.log(info.response)

    } catch (error) {
        console.log(error)
    }
}


const verifyMail = async (req, res) => {
    try {
        console.log(req.query.id)
        const updatedData = await User.updateOne({ _id: req.query.id }, { $set: { verified: true } })
        console.log(updatedData)
        res.render("verifiedEmail")

    } catch (error) {
        console.log(error)
    }

}

export default authRouter
export { verifyMail }