'use client';
import React, { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { fireInTheHole } from '../../llm/llmDSM';
import { motion } from 'framer-motion';

import { ReactMarkdownComponents } from '../../mdx-components';
import LoadingPage from './loading';
interface ChatBotWindowProps {
	handleSendMessage: (message: string) => Promise<void>;
}

const ChatBotWindow: React.FC<ChatBotWindowProps> = ({ handleSendMessage }) => {
	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const [showScrollButton, setShowScrollButton] = useState(false);
	const [hasText, setHasText] = useState(false);
	const [loading, setLoading] = useState<Boolean>(false);

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
		setLoading(true);
		if (message.trim()) {
			setLoading(true);
			console.log(message);
			setMessages((prevMessages) => [...prevMessages, `Question: ${message}`]);
			const newMessage = await fireInTheHole({ prompt: message, agent: 'zero' });
			setMessages((prevMessages) => [...prevMessages, `Answer: ${newMessage}`]);
			console.log(newMessage);
			setMessage('');
		}
		setLoading(false);
	};

	const handleKeyPress = async (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && message.trim()) {
			setLoading(true);
			console.log(message);
			setMessages((prevMessages) => [...prevMessages, `Question: ${message}`]);
			const newMessage = await fireInTheHole({ prompt: message, agent: 'zero' });
			setMessages((prevMessages) => [...prevMessages, `Answer: ${newMessage}`]);
			console.log(newMessage);
			setMessage('');
		}
		setLoading(false);
	};

	return (
		<div className='container content-center'>
			{loading && <LoadingPage />}
			<div className={'flex w-screen'}>
				<motion.div
					initial={{ opacity: 0, x: 150 }}
					whileInView={{ opacity: 1, x: 0 }}
					className={'text-center align-middle flex-1 text-xl font-bold pt-8'}
				>
					<h1 className='text-blue-400 text-3xl'>chatDSM</h1>
					<h2 className='text-base' style={{}}>
						Diagnostic and Statistical Manual
					</h2>
				</motion.div>
			</div>
			<motion.div
				className='flex w-screen mt-20 px-20'
				style={{ minWidth: 700 }}
				initial={{ opacity: 0, y: '-150' }}
				whileInView={{ opacity: 1, y: 0 }}
			>
				<motion.div
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					style={{ minHeight: 400, maxHeight: 500 }}
					className='pb-30 mb-20 flex max-h-96 min-w-full flex-col border-black border-opacity-25 border-2 rounded-lg'
				>
					<div ref={messagesContainerRef} className='flex-grow p-4 overflow-auto'>
						{messages.map((message, index) => (
							<div key={index} className='mb-2 border-1-black border-opacity-70'>
								<div className='bg-gray-200 rounded-md p-2 text-gray-800'>
									<ReactMarkdown
										components={ReactMarkdownComponents()}
										children={message}
										remarkPlugins={[remarkGfm]}
									/>
								</div>
							</div>
						))}
						{showScrollButton && (
							<button
								className='animate-bounce delay-100 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full absolute bottom-0 right-10 mb-20'
								onClick={handleScrollToBottomClick}
							>
								<svg
									className='w-6 h-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
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
					<motion.div
						className='p-4 flex'
						initial={{ opacity: 0, y: '-150' }}
						whileInView={{ opacity: 1, y: 0 }}
					>
						<input
							className='flex-grow border border-gray-400 rounded-md py-2 px-3 text-gray-800 mr-2'
							type='text'
							placeholder='Type your message here'
							value={message}
							onChange={(e) => setMessage(e.target.value)}
							onKeyDown={handleKeyPress}
						/>
						<button
							className={`${
								message == '' ? 'bg-blue-100' : 'bg-blue-500'
							} hover:bg-blue-600 text-white rounded-md py-2 px-4 mx-4`}
							onClick={handleClearClick}
							disabled={message == '' ?? false}
						>
							<svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M12.707 7.293a1 1 0 010 1.414L10.414 10l2.293 2.293a1 1 0 01-1.414 1.414L9 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 011.414-1.414L9 8.586l2.293-2.293a1 1 0 011.414 0z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
						<button
							className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mx-4'
							onClick={handleSendClick}
						>
							Send
						</button>
					</motion.div>
				</motion.div>
			</motion.div>
		</div>
	);
};

export default ChatBotWindow;
