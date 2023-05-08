'use client';

import React, { useState } from 'react';

interface MyComponentState {
	transcript: string;
	isMicrophoneOn: boolean;
}

const MyComponent: React.FC = () => {
	const [state, setState] = useState<MyComponentState>({
		transcript: '',
		isMicrophoneOn: false,
	});

	const handleSpeechRecognition = () => {
		const recognition = new (window as any).webkitSpeechRecognition();
		recognition.lang = 'en-US';
		recognition.continuous = true;

		recognition.onstart = () => {
			setState((prevState) => ({
				...prevState,
				isMicrophoneOn: true,
			}));
		};

		recognition.onend = () => {
			setState((prevState) => ({
				...prevState,
				isMicrophoneOn: false,
			}));
		};

		recognition.onresult = (event: any) => {
			setState((prevState) => ({
				...prevState,
				transcript: event.results[0][0].transcript,
			}));
		};

		if (!state.isMicrophoneOn) {
			recognition.start();
		} else {
			recognition.stop();
		}
	};

	return (
		<div className='max-w-lg mx-auto mt-8'>
			<input
				className='border border-gray-400 rounded-md py-2 px-3 text-gray-800 w-full'
				type='text'
				placeholder='Speak your message'
				value={state.transcript}
				onChange={(e) =>
					setState((prevState) => ({
						...prevState,
						transcript: e.target.value,
					}))
				}
			/>
			<button
				className='bg-blue-500 hover:bg-blue-600 text-white rounded-md py-2 px-4 mt-4'
				onClick={handleSpeechRecognition}
			>
				{state.isMicrophoneOn ? 'Stop' : 'Speak'}
			</button>
		</div>
	);
};

export default MyComponent;
