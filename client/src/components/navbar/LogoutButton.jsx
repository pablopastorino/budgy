import { useAuthContext } from '../../hooks/useAuthContext'
import { useLogout } from '../../hooks/useLogout'
import { Link } from 'react-router-dom'

const LogoutButton = () => {
	const logout = useLogout()
	const { user } = useAuthContext()

	const handleClick = () => {
		logout()
	}

	return (
		<span className='flex flex-col-reverse ml-auto md:flex-row items-baseline'>
			<Link to='/dashboard' className='ml-auto font-semibold text-lg md:text-2xl md:mt-auto'>
				{user.firstName}
			</Link>
			<button
				onClick={handleClick}
				className='px-3 py-1 bg-gray-900 text-white md:px-8 md:py-1 rounded-3xl text-lg font-semibold ml-4'
			>
				Log Out
			</button>
		</span>
	)
}

export default LogoutButton
