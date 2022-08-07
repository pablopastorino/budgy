import { Link, useLocation } from 'react-router-dom'

const LoginButton = () => {
	const { pathname } = useLocation()

	return (
		<Link
			to={pathname === '/login' ? '/signup' : '/login'}
			className='bg-gray-900 text-white px-14 py-2 rounded-xl font-semibold ml-auto'
		>
			{pathname === '/login' ? 'Signup' : 'Login'}
		</Link>
	)
}

export default LoginButton
