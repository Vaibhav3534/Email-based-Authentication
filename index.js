import express from "express"
import cors from "cors"
import connection from "./config/db.js"
import authRouter from "./middlewares/Oldauth.js";
import { verifyMail } from "./middlewares/Oldauth.js";
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import checkAuth from "./middlewares/authMiddleware.js";
import path from "path";
import { fileURLToPath } from 'url';  //for cyclic deploy


const app = express();
app.set('view engine', 'ejs');


app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//serving the frontend (Cyclic deploy)
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.static(path.join(__dirname,"./client_side/build")));

app.get("*", function(_, res){
    res.sendFile(
        path.join(__dirname, "./client_side/build/index.html"),
        function(err){
            res.status(500).send(err)
        }
    )
})


// app.get("/", (req, res)=>{
//     res.send("heyy")
// })
app.use("/auth", authRouter)

app.get("/", checkAuth, (req, res)=>{
    console.log("auth passed")
})
// app.use("/home", )

app.get("/verify", verifyMail)

const port = 8080;

app.listen(port, async(req, res)=>{
    try {
        await connection;
        console.log("connected to database")
    } catch (error) {
        console.log(error)
    }
})

