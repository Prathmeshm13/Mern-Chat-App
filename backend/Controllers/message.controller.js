import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage=async (req,res)=>{
    try {
        const {message}=req.body;
        const {id:recieverId}=req.params;
        const senderId= req.user._id;
        console.log(req.body);
        let conversation= await Conversation.findOne({
            participants:{$all:[senderId,recieverId]}
        })
        if(!conversation){
            conversation= await Conversation.create({
                participants:[senderId,recieverId],
            })
        }
        const newMessage= new Message({
            senderId,
            recieverId,
            message
        })
        if(newMessage){
            conversation.messages.push(newMessage._id);
        }
        await Promise.all([newMessage.save(),conversation.save()]);
        res.status(200).json(newMessage);

    } catch (error) {
        console.log("error in SendMessage controller",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}

export const getMessages= async(req,res)=>{
    try {
        const {id:userTochatId}=req.params;
        const senderId=req.user._id;

        const conversation= await Conversation.findOne({
            participants:{$all:[senderId,userTochatId]}
        }).populate("messages")

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.log("error in Get Message controller",error.message)
        res.status(500).json({error:"Internal Server Error"});
    }
}