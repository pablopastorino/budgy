import React from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
	const logout = useLogout()
	const { user } = useAuthContext()

	const handleClick = () => {
		logout()
	}

	return (
		<header>
			<Link to='/'></Link>
			<nav>
				{user ? (
					<>
						<span>{user.email}</span>
						<button onClick={handleClick}>Log Out</button>
					</>
				) : (
					<>
						<Link to='/login'>Login</Link>
						<Link to='/signup'>Signup</Link>
					</>
				)}
			</nav>
		</header>
	)
}

export default Navbar
