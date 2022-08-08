import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'

import Navbar from './components/navbar/Navbar'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TransactionForm from './pages/Transaction'

import { useAuthContext } from './hooks/useAuthContext'

function App() {
	const { user } = useAuthContext()

	return (
		<div className='App text-gray-900 flex flex-col h-full transition-all'>
			<BrowserRouter>
				<Navbar />
				<div className='h-full flex overflow-y-scroll sm:py-8 py-3'>
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
						<Route
							path='*'
							element={user ? <Home /> : <Navigate to='/login' />}
						></Route>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
