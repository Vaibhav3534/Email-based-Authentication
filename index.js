import express from "express"
import cors from "cors"
import connection from "./config/db.js"
import authRouter from "./controllers/controller.js";
import cookieParser from "cookie-parser"
import checkAuth from "./middlewares/authMiddleware.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';  //for cyclic deploy

dotenv.config()

const app = express();
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
}))
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("This is Api Route")
})

app.use("/auth", authRouter)

//check Authorized user
app.post("/check", checkAuth, (err, res) => {
    // console.log(req.body.token)
    if (res) {
        console.log("auth passed")
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



// console.log(port)
const port = 8080
app.listen(port, async (req, res) => {
    try {
        await connection;
        console.log("connected to database")
    } catch (error) {
        console.log("error.message")
    }
})

