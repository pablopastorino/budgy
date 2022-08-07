import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import Logo from './Logo'
import LoginButton from './LoginButton'
import Navigation from './Navigation'

const Navbar = () => {
	const { user } = useAuthContext()

	return (
		<header className='rounded-b-3xl text-white block py-6 px-4 bg-gradient-to-l from-violet-500 to-indigo-500 hover:bg-gradient-to-r transition-all'>
			<nav className='flex items-center justify-center'>
				<Logo />
				{user ? <Navigation /> : <LoginButton />}
			</nav>
		</header>
	)
}

export default Navbar
