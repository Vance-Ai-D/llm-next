'use client';
import Image from 'next/image';
import DescriptionLabel from 'components/mdx/descriptionLabel.mdx';
import DetailsLabel from 'components/mdx//detailsLabel.mdx';

import { submitRequirements } from '../appUtils/utils';

import { useState } from 'react';
import Link from 'next/link';

import { FaForward } from 'react-icons/fa';

export default function Home() {
	const [userPrompt, setUserPrompt] = useState<string>({});

	const onBlur = (e: any) => {
		const value = e.target.value;
		const fieldName = e.target.name;
		let userPromptCopy = userPrompt;
		switch (fieldName) {
			case 'prompt':
				console.log(value, fieldName);
				let promptCopy = value;
				setUserPrompt(promptCopy);
				break;
			// case 'projDesc':
			// 	console.log(value, fieldName);
			// 	userPromptCopy = { ...userPromptCopy, projDesc: value };
			// 	setUserPrompt({ ...userPromptCopy });
			// 	break;
			// case 'projDetails':
			// 	console.log(value, fieldName);
			// 	userPromptCopy = { ...userPromptCopy, projDetails: value };
			// 	setUserPrompt({ ...userPromptCopy });
			// 	break;
			default:
				break;
		}
		console.log('newDetails', value);
	};

	return (
		<>
			{console.log({ userPrompt })}

			<div className='grid'>
				<div className='text-center px-20 grid'>
					<Image
						alt='Alien holding a weapon ready to build your website'
						src='./alienGun.svg'
						width={150}
						height={150}
						className='mx-auto'
					/>
					<div className='mt-5 mb-10 space-y-2 justify-center p-10 bg-black rounded-3xl bg-opacity-10 border-black border-2 border-opacity-20 drop-shadow-lg'>
						<h3 className='text-gray-800 text-xl font-bold sm:text-md max-w-2xl'>
							Give a description of the website you want to make, along with basic feature and
							site flow description:
						</h3>
					</div>
				</div>
				<form
					// onSubmit={(e) => e.preventDefault()}
					className='mt-8 space-y-5'
				>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<input
							onBlur={onBlur}
							type='text'
							name='prompt'
							multiple
							placeholder='Enter Website Description'
							required
							style={{ height: 100, maxWidth: 800, minWidth: 500 }}
							className='mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
						/>
					</div>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
						}}
					>
						<Link href='./build'>
							<button
								className='max-w-xs px-4 my-10 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150'
								onClick={() => submitRequirements(userPrompt)}
							>
								Ready to Build Your Site?
							</button>
						</Link>
					</div>
				</form>
			</div>
		</>
	);
}
