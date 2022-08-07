import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import TransactionForm from './components/TransactionForm'
import Signup from './pages/Signup'

import { useAuthContext } from './hooks/useAuthContext'

function App() {
	const { user } = useAuthContext()

	return (
		<div className='App text-gray-900 flex flex-col h-full transition'>
			<BrowserRouter>
				<Navbar />
				<div className='h-full flex flex-col items-center overflow-y-scroll mb-8'>
					<Routes>
						<Route
							path='/'
							element={user ? <Home /> : <Navigate to='/login' />}
						></Route>
						<Route
							path='/new'
							element={user ? <TransactionForm /> : <Navigate to='/login' />}
						/>
						<Route
							path='/dashboard'
							element={user ? <Dashboard /> : <Navigate to='/login' />}
						/>

						<Route path='/login' element={!user ? <Login /> : <Navigate to='/' />} />
						<Route path='/signup' element={!user ? <Signup /> : <Navigate to='/' />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
