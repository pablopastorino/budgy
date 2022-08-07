import { Link } from 'react-router-dom'

const FloatingButton = ({ children, to }) => {
	return (
		<Link
			to={to}
			className={`shadow-3xl absolute right-4 bottom-4 bg-gray-900 text-white w-20 h-20 flex items-center justify-center rounded-full font-extrabold`}
		>
			{children}
		</Link>
	)
}

export default FloatingButton
