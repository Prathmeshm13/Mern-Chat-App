import User from "../models/userModel.js";
import bcrypt from "bcryptjs"
import generateJWT from "../utils/generateToken.js";

export const signupUser= async (req,res)=>{
    try {
    const {fullName,username,password,confirmpassword,gender}=req.body;
    if(password!=confirmpassword){
        return res.status(400).json({error:"passwords don't match"});
    }
    const user=await User.findOne({username});
    if(user){
        return res.status(400).json({error:"user already exists"});
    }
    const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`;

    const salt= await bcrypt.genSalt(10);
    const hashedPass= await bcrypt.hash(password,salt);
    const newUser=new User({
        fullName,
        username,
        password:hashedPass,
        gender,
        profilepic:gender==="male"?boyProfilePic:girlProfilePic
    })
    await newUser.save();
    if(newUser){
    await generateJWT(newUser._id,res);
    res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        username:newUser.username,
        profilepic:newUser.profilepic
    })
    }
    else{
        res.status(400).json({error:"Invalid User Data"});
    }

    } catch (error) {
        console.log("error in SignUp controller",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const loginUser= async(req,res)=>{
    try {
        const {username,password}=req.body;
        const user= await User.findOne({username});
        const isPassCorrect= await bcrypt.compare(password,user.password||" ");
        if(!user || !isPassCorrect){
            return res.status(400).json({error:"Invalid Credentials"});
        }
        generateJWT(user._id,res);
        res.status(201).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilepic:user.profilepic
        })

    } catch (error) {
        console.log("error in Login controller",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const logoutUser= (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({msg:"Logged out successfully"})
    } catch (error) {
        console.log("error in Logout controller",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}