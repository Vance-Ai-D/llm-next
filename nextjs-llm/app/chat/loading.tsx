import Image from 'next/image';

const LoadingPage = () => {
	return (
		<>
			<div className='fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-screen h-screen bg-black bg-opacity-50'>
				{/* <div className='flex space-x-2'>
					{[...Array(7)].map((_, index) => (
						<div
							key={index}
							className='w-3 h-3 bg-white rounded-full animate-ping'
							style={{ animationDelay: `${index * 0.1}s` }}
						></div>
					))}
				</div>
			*/}
				<Image
					alt='Alien holding gun'
					width={100}
					height={100}
					src={'./alienGun.svg'}
					className='text-white animate-ping'
					style={{}}
				/>
			</div>
		</>
	);
};

export default LoadingPage;
