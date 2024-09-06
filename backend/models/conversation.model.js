import mongoose from "mongoose";
import User from "./userModel.js";
import Message from "./message.model.js";

const consversationSchema= new mongoose.Schema({
    participants:[
        {
            type:mongoose.Types.ObjectId,
            ref:User,
        }
    ],
    messages:[
        {
            type:mongoose.Types.ObjectId,
            ref:Message,
        }
    ],
},{timestamps:true});
const Conversation=mongoose.model("conversation",consversationSchema);
export default Conversation;
