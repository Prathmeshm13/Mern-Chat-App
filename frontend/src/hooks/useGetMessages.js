import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import useConversation from '../zustand/useConversation';
const useGetMessages=()=>{
    const [loading,setloading]=useState(false);
    const {messages,setMessages,selectedConversation,setSelectedConversation}=useConversation();
    useEffect(()=>{
    setloading(true);
    const getMessages=async()=>{
        try {
            const res= await fetch(`/api/messages/get/${selectedConversation._id}`);
            const data= await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            console.log(data);
            setMessages(data);
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setloading(false);
        }
    }
    if(selectedConversation?._id){
        getMessages();
    }},[selectedConversation?._id,setMessages])
    return {messages,loading}
}

export default useGetMessages