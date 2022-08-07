import { Link, useLocation } from 'react-router-dom'
import { GraphIcon } from '../../assets/GraphIcon'
import { PencilIcon } from '../../assets/PencilIcon'
import { ListIcon } from '../../assets/ListIcon'
import LogoutButton from './LogoutButton'

const Navigation = () => {
	const { pathname } = useLocation()
	return (
		<>
			{pathname !== '/' && (
				<Link to='/' className='h-full text-3xl transition-all sm:ml-2 flex items-end ml-3'>
					<ListIcon />
					<span className='hidden sm:inline-block'>List</span>
				</Link>
			)}
			{pathname !== '/dashboard' && (
				<Link
					to='/dashboard'
					className='h-full text-3xl transition-all sm:ml-2 flex items-end ml-3'
				>
					<GraphIcon />
					<span className='hidden sm:inline-block'>Graphs</span>
				</Link>
			)}
			{pathname !== '/new' && (
				<Link
					to='/new'
					className='h-full text-3xl transition-all sm:ml-2 flex items-end ml-3'
				>
					<PencilIcon />
					<span className='hidden sm:inline-block'>New</span>
				</Link>
			)}
			<LogoutButton />
		</>
	)
}

export default Navigation
