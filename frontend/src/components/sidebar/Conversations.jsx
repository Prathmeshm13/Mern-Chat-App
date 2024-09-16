
import useGetConversation from "../../hooks/useGetConversation";
import Conversation from "./Conversation";

const Conversations = () => {
	const {loading,conversations}=useGetConversation();
	console.log(conversations);
	return (
		<div className='py-2 flex flex-col overflow-auto'>
			{conversations.map((ele,indx)=>(
				<Conversation 
				key={ele._id}
				conversation={ele}
				lastidx={indx==conversations.length-1}
				/>
			))}
		</div>
	);
};
export default Conversations;