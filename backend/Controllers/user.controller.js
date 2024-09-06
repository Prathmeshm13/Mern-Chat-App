import User from "../models/userModel.js";

export const getUsersforSideBar=async(req,res)=>{
    try {
        const loggedinUsers=req.user._id;
        const filteredUsers=await User.find({_id:{$ne:loggedinUsers}}).select("-password");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("error in user controller",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}