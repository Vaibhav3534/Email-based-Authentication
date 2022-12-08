import express from "express"
import cors from "cors"
import connection from "./config/db.js"
import authRouter from "./controllers/controller.js";
import cookieParser from "cookie-parser"
import checkAuth from "./middlewares/authMiddleware.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';  //for cyclic deploy
import userModel from "./models/userModel.js"
import mongoose from "mongoose";

const user = userModel

dotenv.config()


const app = express();
mongoose.set('strictQuery', true);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, "./client_side/build")))
app.get("*", function(_, res){
    res.sendFile(path.join(__dirname, "./client_side/build/index.html"),
    function(err){
        res.send(err)
    })
})
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}))
// app.use(cors)
app.use(cookieParser())



app.get("/", (req, res) => {
    res.send("This is Api Route")
})

app.use("/auth", authRouter)

//check Authorized user
app.post("/check", checkAuth, (err, res) => {
    
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
        // throw new Error
    }
})


//post api for addition
app.post("/add", async(req, res)=>{
    const {num1, num2} = req.body.input
    console.log("into api", req.body)
    console.log(num1)
    try {
        const sum = parseInt(num1) + parseInt(num2)
        console.log(sum)
        // await user.save()
    
        return res
            .status(201)
            .send({sum: sum, message:"the sum is calculated"})

    } catch (error) {
        return res.status(500).send(error.message)
    }
})


// console.log(port)
const port = 8080
app.listen(port, async (req, res) => {
    try {
        await connection;
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
})

