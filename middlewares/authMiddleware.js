import jwt from "jsonwebtoken"
// import cookieParser from "cookie-parser";
import express from "express"
import dotenv from "dotenv"

dotenv.config()
const Auth = express.Router()

const checkAuth = (req, res, next) => {
    
    try {
        console.log("inside checkAuth")
        const token = req.body.token;
        console.log(token)

        if (!token || token === undefined) {
            return res
                .status(202)
                .send({success:false,message:"No token Provided"})
        }

        jwt.verify(token, process.env.SECRETE_KEY)
        const data = jwt.decode(token)
        console.log(data)

        next()

    } catch (err) {
        console.log(err.message)
        res
            // .status(401)
            .send({ success:false,message:err.message})
    }
}

Auth.post("/auth", checkAuth, (err, res) => {
    
    if (res) {
        console.log("auth passed")
        console.log()
        res
            .status(201)
            .send({success:true, message: "Authorized" })
    }
    else {
        console.log(err)
        res.send(err)
    }
})


export default Auth