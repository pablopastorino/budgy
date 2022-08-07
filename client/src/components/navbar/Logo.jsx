import { Link } from 'react-router-dom'

const Logo = () => {
	return (
		<Link to='/' className='font-extrabold text-4xl flex items-center mr-4'>
			<span className='hidden sm:inline-flex rounded-lg bg-orange-400 text-gray-900 px-4 py-2'>
				Budgy
			</span>
			<span className='sm:hidden inline-flex rounded-lg bg-orange-400 text-gray-900 px-4 py-2'>
				Bg
			</span>
			<span className='text-blue-200 ml-2 md:flex md:flex-col lg:flex-row lg:space-x-1 justify-center hidden md:text-lg md:self-end'>
				<span className='leading-none font-bold'>Make</span>
				<span className='leading-none font-bold'>It</span>
				<span className='leading-none font-bold'>Count!</span>
			</span>
		</Link>
	)
}

export default Logo
