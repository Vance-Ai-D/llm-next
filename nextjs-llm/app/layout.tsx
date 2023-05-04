import './globals.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Footer from './footer';
import Header from './header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	const apiKey = 'sk-23l2kf2no3p09irjpigfnpoignopign2opirfpoajf';
	const footerNavs = [
		{
			label: 'Resources',
			items: [
				{
					href: 'javascript:void()',
					name: 'contact',
				},
				{
					href: 'javascript:void()',
					name: 'Support',
				},
				{
					href: 'javascript:void()',
					name: 'Documentation',
				},
				{
					href: 'javascript:void()',
					name: 'Pricing',
				},
			],
		},
		{
			label: 'About',
			items: [
				{
					href: 'javascript:void()',
					name: 'Terms',
				},
				{
					href: 'javascript:void()',
					name: 'License',
				},
				{
					href: 'javascript:void()',
					name: 'Privacy',
				},
				{
					href: 'javascript:void()',
					name: 'About US',
				},
			],
		},
		{
			label: 'Explore',
			items: [
				{
					href: 'javascript:void()',
					name: 'Showcase',
				},
				{
					href: 'javascript:void()',
					name: 'Roadmap',
				},
				{
					href: 'javascript:void()',
					name: 'Languages',
				},
				{
					href: 'javascript:void()',
					name: 'Blog',
				},
			],
		},
		{
			label: 'Company',
			items: [
				{
					href: 'javascript:void()',
					name: 'Partners',
				},
				{
					href: 'javascript:void()',
					name: 'Team',
				},
				{
					href: 'javascript:void()',
					name: 'Careers',
				},
			],
		},
	];

	return (
		<html lang='en'>
			{/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
			<head title='VanceLLM'>
				<script src='http://localhost:8097'></script>
			</head>
			<body className={`${inter.className}`}>
				<main className={'w-full h-full items-center justify-center'}>
					<Header />
					<div className='w-full min-h-full flex-auto'>{children}</div>
					<Footer />
				</main>
			</body>
		</html>
	);
}
