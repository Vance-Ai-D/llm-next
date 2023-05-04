import type { MDXComponents } from 'mdx/types';

// This file is required to use MDX in `app` directory.
import { Inter, Roboto } from 'next/font/google';

// const inter = Inter({ subsets: ['latin'] });
const roboto = Roboto({ weight: '400', style: 'normal', subsets: ['latin'] });

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		// Allows customizing built-in components, e.g. to add styling.
		h1: ({ children }) => (
			<h1 className={`${roboto.className}`} style={{ fontSize: '25px', color: 'red' }}>
				{children}
			</h1>
		),
		h2: ({ children }) => (
			<h1 className={`${roboto.className}`} style={{ fontSize: '15px' }}>
				{children}
			</h1>
		),
		h3: ({ children }) => (
			<h1 className={`${roboto.className}`} style={{ fontSize: '15px', color: 'red' }}>
				{children}
			</h1>
		),
		h4: ({ children }) => (
			<h1 className={`${roboto.className}`} style={{ fontSize: '12px', color: 'red' }}>
				{children}
			</h1>
		),
		p: ({ children }) => (
			<h1 className={`${roboto.className}`} style={{ fontSize: '10px' }}>
				{children}
			</h1>
		),
		...components,
	};
}

export const ReactMarkdownComponents = () => {
	let components = {
		h1: ({ node, ...props }) => <h1 className={`${roboto.className} text-bold`} {...props} />,
		h2: ({ node, ...props }) => <h1 className={`${roboto.className}`} {...props} />,
		li: ({ node, ...props }) => (
			<li
				className={`${roboto.className}`}
				style={{ listStyleType: 'none', listStylePosition: 'inside' }}
				{...props}
			/>
		),
		ul: ({ node, ...props }) => (
			<ul
				className={`${roboto.className}`}
				style={{ listStyleType: 'none', listStylePosition: 'outside', marginLeft: 20 }}
				{...props}
			/>
		),
		ol: ({ node, ...props }) => (
			<ol
				className={`${roboto.className}`}
				style={{ listStyleType: 'none', listStylePosition: 'outside' }}
				{...props}
			/>
		),
		p: ({ node, ...props }) => (
			<p
				className={`${roboto.className}`}
				style={{ color: 'rgba(33,25,15', fontWeight: 500, fontSize: 20 }}
				{...props}
			/>
		),
	};
	return components;
};
