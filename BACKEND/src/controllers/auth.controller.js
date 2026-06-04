import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
const registerUser = async (req, res) => {
    const { username, email, password, role = 'user' } = req.body
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })
    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User Already Exists"
        })
    }
    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username, email, password: hash, role
    })
    const token = jwt.sign({
        id: user._id,
        role: user.userModel
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    return res.status(201).json({
        message: "User Registered Successfully",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}

const loginUser=async(req,res)=>{
    const {username,email,password}=req.body
    const user=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(!user){
        return res.status(401).json({
            message:"Invalid User Credentials"
        })
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }
    const token=jwt.sign({
        id:user._id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token)
    return res.status(200).json({
        message:"Login Successful",
        user:{
            id:user._id,
            username:user.username,
            email:user.email,
            role:user.role
        }
    })
}

const logoutUser=async(req,res)=>{
    res.clearCookie("token")
    return res.status(200).json({
        message:"User Logged Out Successfully"
    })
}

export default { registerUser,loginUser,logoutUser}