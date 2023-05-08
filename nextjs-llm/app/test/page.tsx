'use client';
import React, { useState, useRef, useEffect } from 'react';
interface ChatBotWindowProps {
	handleSendMessage: (message: string) => Promise<void>;
}

const ChatBotWindow: React.FC<ChatBotWindowProps> = ({ handleSendMessage }) => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const [showScrollButton, setShowScrollButton] = useState(false);
	const [hasText, setHasText] = useState(false);

	const handleScroll = () => {
		if (messagesContainerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = messagesContainerRef.current;
			setShowScrollButton(scrollTop + clientHeight < scrollHeight);
		}
	};

	const handleScrollToBottomClick = () => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
		}
	};

	useEffect(() => {
		if (messagesContainerRef.current) {
			messagesContainerRef.current.addEventListener('scroll', handleScroll);
		}
		return () => {
			if (messagesContainerRef.current) {
				messagesContainerRef.current.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);

	useEffect(() => {
		setHasText(message.trim().length > 0);
		if (messagesContainerRef.current) {
			messagesContainerRef.current.scrollTo(0, messagesContainerRef.current.scrollHeight);
		}
	}, [messages]);

	const handleClearClick = () => {
		setMessage('');
	};

	const handleSendClick = async () => {
		if (message.trim()) {
			console.log(message);
			// await handleSendMessage(message);
			setMessages((prevMessages) => [...prevMessages, `Question: ${message}`]);
			setMessage('');
		}
	};

	const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && message.trim()) {
			console.log(message);
			// await handleSendMessage(message);
			setMessages((prevMessages) => [...prevMessages, `Question: ${message}`]);
			setMessage('');
		}
	};

	return (
		<div className='flex flex-col relative max-h-96 min-h-96 max-w-3xl overflow-y-scroll'>
			<div ref={messagesContainerRef} className='flex-grow p-4 overflow-auto'>
				{messages.map((message, index) => (
					<div key={index} className='mb-2 border-1-black border-opacity-75'>
						<div className='bg-gray-200 rounded-md p-2 text-gray-800'>{message}</div>
					</div>
				))}
				{showScrollButton && (
					<button
						className='animate-bounce delay-100 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full absolute bottom-0 right-10 mb-20'
						onClick={handleScrollToBottomClick}
					>
						<svg className='w-6 h-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M19 9l-7 7-7-7'
							/>
						</svg>
					</button>
				)}
			</div>
			<div className='p-4 flex'>
				<input
					className='flex-grow border border-gray-400 rounded-md py-2 px-3 text-gray-800 mr-2'
					type='text'
					placeholder='Type your message here'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={handleKeyPress}
				/>
				{hasText && (
					<button
						className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'
						onClick={handleClearClick}
					>
						<svg className='w-4 h-4' viewBox='0 0 20 20' fill='currentColor'>
							<path
								fillRule='evenodd'
								d='M12.707 7.293a1 1 0 010 1.414L10.414 10l2.293 2.293a1 1 0 01-1.414 1.414L9 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 011.414-1.414L9 8.586l2.293-2.293a1 1 0 011.414 0z'
								clipRule='evenodd'
							/>
						</svg>
					</button>
				)}
				<button
					className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4'
					onClick={handleSendClick}
				>
					Send
				</button>
			</div>
		</div>
	);
};

export default ChatBotWindow;
