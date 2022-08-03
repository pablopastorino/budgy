import { useEffect } from 'react'
import { useAuthContext } from './hooks/useAuthContext'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import TransactionForm from './components/TransactionForm'

function App() {
	const { user } = useAuthContext()

	return (
		<div className='App text-sky-900 flex flex-col h-full'>
			<BrowserRouter>
				<Navbar />
				<div className='h-full flex flex-col items-center justify-center'>
					<Routes>
						<Route
							path='/'
							element={user ? <Home /> : <Navigate to='/login' />}
						></Route>
						<Route
							path='/new'
							element={
								user ? (
									<TransactionForm />
								) : (
									<Navigate to='/login' />
								)
							}
						/>
						<Route
							path='/login'
							element={!user ? <Login /> : <Navigate to='/' />}
						/>
						<Route
							path='/signup'
							element={!user ? <Signup /> : <Navigate to='/' />}
						/>
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App
