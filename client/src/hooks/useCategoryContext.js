import { useContext } from 'react'
import { CategoriesContext } from '../context/CategoryContext'

export const useCategoriesContext = () => {
	const context = useContext(CategoriesContext)
	if (!context) throw Error('useCategoriesContext must be used inside CategoriesContextProvider')

	return context
}
