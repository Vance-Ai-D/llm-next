const LoadingPage = () => {
	return (
		<div className='fixed top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-black bg-opacity-50'>
			<div className='flex space-x-2'>
				{[...Array(7)].map((_, index) => (
					<div
						key={index}
						className='w-2 h-2 bg-white rounded-full animate-pulse'
						style={{ animationDelay: `${index * 0.1}s` }}
					></div>
				))}
			</div>
		</div>
	);
};

export default LoadingPage;
