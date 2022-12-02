import jwt from "jsonwebtoken"

const checkAuth = async(req, res, next)=>{

    const token = req.cookies.token;
    if(!token){
        // return new Error
        res.send("no token")
    }
    try { 
        jwt.verify(token,process.env.SECRETE_KEY )
        const data = jwt.decode(token)

        next()

    } catch (error) {
        console.log(error)
        
        // throw new Error
    }
}


export default checkAuth