import { IoSearchSharp } from "react-icons/io5";
import { useAuthContext } from "../../context/AuthContext";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";

const SearchInput = () => {
    const { authUser } = useAuthContext();
    const [search, setsearch]=useState("");
    const {setSelectedConversation}=useConversation();
    const {conversations}=useGetConversation()
    const handleSubmit=(e)=>{
        e.preventDefault();
        if(search.length==0){
            return;
        }
        if(search.length<3){
            toast.error("Length should be at least 3");
            return;
        }
        const conversation=conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
        if(!conversation){
            toast.error("No such User");
            setsearch("");
            return;
        }
        setSelectedConversation(conversation)
        setsearch("");
    }
    return (
        <>
            <form className='flex items-center gap-2' onSubmit={handleSubmit}>
                <input type='text' placeholder='Search…' className='input input-bordered rounded-full' value={search} onChange={(e)=>setsearch(e.target.value)} />
                <button type='submit' className='btn btn-circle bg-sky-500 text-white'>
                    <IoSearchSharp className='w-6 h-6 outline-none' />
                </button>
                <div className='relative group'>
                    <div className='avatar online'>
                        <div className='w-12 rounded-full'>
                            <img
                                src={authUser.profilepic}
                                alt='user avatar'
                            />
                        </div>
                    </div>
                    <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 bg-gray-800 text-white text-sm rounded-md py-1 px-2 mt-1 transition-opacity duration-200'>
                        {authUser.fullName}
                    </div>
                </div>
            </form>
        </>
    );
};
export default SearchInput;
