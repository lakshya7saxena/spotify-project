import jwt from "jsonwebtoken"
const verifyArtist = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(decoded.role !== "artist"){
            return res.status(403).json({
                message:"You don't have access to create music"
            })
        }
        req.user=decoded
        next()
    } catch (err) {
        return res.status(401).json({
            message: "Unauthorized Access"
        })

    }
}
const verifyUser=async(req,res,next)=>{
    const token=req.cookies.token
    if(!token){
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role !== 'user'){
            return res.status(403).json({
                message:"You don't have access"
            })
        }
        req.user=decoded
        next()
    }catch(err){
        return res.status(401).json({
            message: "Unauthorized Access"
        })
    }
}
export default {verifyArtist,verifyUser}