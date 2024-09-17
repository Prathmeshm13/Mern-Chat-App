import { useSocketContext } from "../../context/SocketContext.jsx";
import { funEmojis,getEmoji } from "../../utils/emoji";
import useConversation from "../../zustand/useConversation.js";
const Conversation =({conversation,lastidx}) => {
	const { selectedConversation,setSelectedConversation}=useConversation();
	const isSelected=selectedConversation?._id===conversation._id;
	const emo=getEmoji();
	const {onlineUsers}=useSocketContext();
	const isonline=onlineUsers.includes(conversation._id)
	return (
		<>
			<div className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${isSelected?"bg-sky-500":""}`} onClick={()=>setSelectedConversation(conversation)}>
				<div className={`avatar ${isonline?"online":""}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilepic}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-200'>{conversation.fullName}</p>
						<span className='text-xl'>{emo}</span>
					</div>
				</div>
			</div>

			{!lastidx?<div className='divider my-0 py-0 h-1' />:""}
		</>
	);
};
export default Conversation;