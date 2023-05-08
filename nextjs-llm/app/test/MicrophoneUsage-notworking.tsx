'use client';
import Image from 'next/image';
import DescriptionLabel from 'components/mdx/descriptionLabel.mdx';
import DetailsLabel from 'components/mdx//detailsLabel.mdx';

import { submitRequirements } from '../appUtils/utils';

import Link from 'next/link';
import { FaForward } from 'react-icons/fa';
import { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';

const ChatWindow: React.FC = () => {
	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } =
		useSpeechRecognition();

	return (
		<div className='max-w-lg mx-auto mt-8'>
			{browserSupportsSpeechRecognition ? (
				<>
					<input
						className='border border-gray-400 rounded-md py-2 px-3 text-gray-800 w-full'
						type='text'
						placeholder='Speak your message'
						value={transcript}
					/>
					<button
						className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4'
						onClick={
							state.isMicrophoneOn
								? () => {
										SpeechRecognition.stopListening;
								  }
								: () => {
										SpeechRecognition.startListening;
								  }
						}
					>
						{listening ? 'Stop' : 'Speak'}
					</button>{' '}
				</>
			) : (
				<>
					<input
						className='border border-gray-400 rounded-md py-2 px-3 text-gray-800 w-full'
						type='text'
						placeholder='Your browser does not support voice to text'
					/>
					<button
						className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4'
						disabled={true}
					>
						{'Speak'}
					</button>{' '}
				</>
			)}
		</div>
	);
};

export default ChatWindow;
