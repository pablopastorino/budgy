import { useTransactionsContext } from '../../hooks/useTransactionsContext'
import { formatter, getBalance } from '../../utils/helpers'

const Balance = () => {
	const { transactions } = useTransactionsContext()

	return (
		<div className='sm:flex-1 flex'>
			<div className='m-auto rounded-3xl h-24 sm:h-36 px-6 w-11/12 md:w-4/6 text-white bg-gray-900 flex justify-between'>
				<span className='text-4xl flex items-center content-center'>
					{formatter.format(getBalance(transactions))}
				</span>
				<span className='flex items-center content-center text-sky-300 md:ml-2'>USD</span>
			</div>
		</div>
	)
}

export default Balance
