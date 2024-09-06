import mongoose from "mongoose";
import User from "./userModel.js";

const messageSchema= new mongoose.Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        ref:User,
        required:true
    },
    recieverId:{
        type:mongoose.Types.ObjectId,
        ref:User,
        required:true
    },
    message:{
        type:String,
        required: true
    }
},{timestamps:true})

const Message=mongoose.model("message",messageSchema);

export default Message;