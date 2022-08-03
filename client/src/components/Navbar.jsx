import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
	const logout = useLogout()
	const { user } = useAuthContext()
	const { pathname } = useLocation()

	const handleClick = () => {
		logout()
	}

	return (
		<header className='block py-6 px-4'>
			<nav className='flex items-center'>
				{user ? (
					<>
						<Link
							to='/'
							className='font-extrabold text-4xl flex items-center'
						>
							<span className='hidden sm:inline-flex rounded-lg bg-orange-400 px-4 py-2'>
								Budgy
							</span>
							<span className='sm:hidden inline-flex rounded-lg bg-orange-400 px-4 py-2'>
								Bg
							</span>
							<span className='hidden md:font-normal md:text-lg md:self-end'>
								&nbsp; Make it count!
							</span>
						</Link>
						<Link
							className='h-full text-3xl transition-all ml-2 flex items-end'
							to={pathname === '/' ? '/dashboard' : '/'}
						>
							{pathname === '/' ? (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-12 w-12 transition-all'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z'
									/>
								</svg>
							) : (
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-12 w-12 transition-all'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
									strokeWidth={2}
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01'
									/>
								</svg>
							)}
							<span>{pathname === '/' ? 'Graphs' : 'List'}</span>
						</Link>
						<span className='flex flex-col-reverse ml-auto sm:flex-row items-start'>
							<Link
								to='/dashboard'
								className='ml-auto font-semibold text-lg sm:text-2xl sm:mt-auto'
							>
								{user.firstName}
							</Link>
							<button
								onClick={handleClick}
								className='px-2 py-1 bg-sky-300 text-white sm:px-14 sm:py-2 rounded-xl font-semibold ml-4'
							>
								Log Out
							</button>
						</span>
					</>
				) : (
					<>
						<Link
							to='/'
							className='font-extrabold text-4xl flex items-center'
						>
							<span className='sm:hidden inline-flex rounded-lg bg-orange-400 px-4 py-2'>
								Bg
							</span>
							<span className='hidden sm:inline-flex rounded-lg bg-orange-400 px-4 py-2'>
								Budgy
							</span>
							<span className='hidden sm:inline-block sm:font-normal sm:text-lg sm:self-end'>
								&nbsp; Make it count!
							</span>
						</Link>
						<Link
							to={pathname === '/login' ? '/signup' : '/login'}
							className='bg-sky-900 text-white px-14 py-2 rounded-xl font-semibold ml-auto'
						>
							{pathname === '/login' ? 'Signup' : 'Login'}
						</Link>
					</>
				)}
			</nav>
		</header>
	)
}

export default Navbar
