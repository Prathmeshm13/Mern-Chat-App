import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../skeletons/messageskeleton";
import Message from "./Message";

const Messages = () => {
	const {messages,loading}=useGetMessages();
	const lastMessageRef = useRef();
	useEffect(() => {
		setTimeout(() => {
			lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
		}, 100);
	}, [messages]);

	console.log(messages);
	return (
		<div className='px-4 flex-1 overflow-auto'>
		{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}
		    {!loading && messages.length==0 && (<p className="text-center text-white">Send a Message to start conversation</p>)}
			{loading && [...Array(5)].map((_,idx)=><MessageSkeleton key={idx}/>)}
		</div>
	);
};
export default Messages;