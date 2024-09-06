import jwt from "jsonwebtoken"
import User from "../models/userModel.js";

export const protectRoute= async (req,res,next)=>{
    try {
        const token= req.cookies.jwt;
        if(!token){
            return res.status(401).json({error:"No token Provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({error:"Invalid Credentials"})
        }
        const user=await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(400).json({msg:"No User Found"});
        }
        req.user=user;
        next();
    } catch (error) {
        console.log("error in protectROute middleware",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
} 