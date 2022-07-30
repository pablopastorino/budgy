import { useAuthContext } from './hooks/useAuthContext'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
	const { user } = useAuthContext()

	return (
		<div className='App'>
			<BrowserRouter>
				<Navbar />
				<div className='main'>
					<Routes>
						<Route
							path='/'
							element={user ? <Home /> : <Navigate to='/login' />}
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
