import { useState } from "react";
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext";
const  useSignup=()=>{
    const [loading,setLoading]=useState(false);
    const {setAuthUser}=useAuthContext();
    const signup=async ({fullName,username,password,confirmpassword,gender})=>{
        const success=handleInputErrors({fullName,username,password,confirmpassword,gender})
        if(!success)return;
        setLoading(true);
        try {
            const res=await fetch("http://localhost:8000/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,username,password,confirmpassword,gender})
            })
            const data= await res.json();
            if(data.error){
                throw new Error(data.error);
            }
            localStorage.setItem('chat-user',JSON.stringify(data))
            console.log(data);
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return {loading,signup}
}

export default useSignup;

const handleInputErrors=({fullName,username,password,confirmpassword,gender})=>{
    if(!fullName || !username || !password || !confirmpassword || !gender){
        toast.error('Please fill in all fields');
        return false;
    }

    if(password!==confirmpassword){
        toast.error("Password and Confirm Passwords do not match")
        return false;
    }

    if(password.length<6){
        toast.error("Password length should be minimum 6")
        return false;
    }
    return true;
}