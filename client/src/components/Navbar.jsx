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
		<header className='hidden sm:block py-6 px-4'>
			<nav className='flex items-center'>
				{user ? (
					<>
						<Link
							to='/'
							className='font-extrabold text-4xl flex items-center'
						>
							<span className='inline-flex rounded-lg bg-orange-400 px-4 py-2'>
								Budgy
							</span>
							<span className='font-normal text-lg self-end'>
								&nbsp; Make it count!
							</span>
						</Link>
						<span className='ml-auto font-semibold text-lg'>
							{user.firstName}
						</span>
						<button
							onClick={handleClick}
							className='bg-sky-300 text-white px-14 py-2 rounded-xl font-semibold ml-4'
						>
							Log Out
						</button>
					</>
				) : (
					<>
						<Link
							to='/'
							className='font-extrabold text-4xl flex items-center'
						>
							<span className='inline-flex rounded-lg bg-orange-400 px-4 py-2'>
								Budgy
							</span>
							<span className='font-normal text-lg self-end'>
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
