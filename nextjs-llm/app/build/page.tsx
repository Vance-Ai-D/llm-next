'use client';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import DescriptionLabel from 'components/mdx/descriptionLabel.mdx';
import DetailsLabel from 'components/mdx//detailsLabel.mdx';

import { useState, forwardRef, useRef } from 'react';
import { OpenAI } from 'langchain/llms/openai';
import { processProject } from '../../appUtils/utils';
import Link from 'next/link';
import LoadingPage from './loading';

import { useMDXComponents } from '../../mdx-components';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { ReactMarkdownComponents } from '../../mdx-components';

const inter = Inter({ subsets: ['latin'] });

export default function BuildSite() {
	const ref = useRef();
	const [apiKey, setApiKey] = useState<string>('');
	const [response, setResponse] = useState<string>('');
	const [loading, setLoading] = useState<Boolean>();

	const buildSite = async () => {
		setLoading(true);
		const llmResponse = await processProject();
		setResponse(llmResponse);
		setLoading(false);
	};

	return (
		<>
			{loading && <LoadingPage />}
			<div>
				<div style={{ padding: 5 }}>
					<h3>Now for the fun stuff....</h3>
				</div>
				<button
					title='Submit'
					style={{
						height: 100,
						width: '50%',
						borderRadius: 15,
						borderColor: 'rgba(0, 0, 0, 0.2)',
					}}
					onClick={buildSite}
				>
					<h2>Build Site</h2>
				</button>
				<div className='mx-20 bg-black bg-opacity-20 rounded-md p-5 overflow-y-scroll mb-20'>
					<ReactMarkdown
						components={ReactMarkdownComponents()}
						children={response}
						remarkPlugins={[remarkGfm]}
					/>
				</div>
			</div>
		</>
	);
}
