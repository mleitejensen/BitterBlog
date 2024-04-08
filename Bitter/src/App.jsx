import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Posts from './pages/Posts'
import User from './pages/User'
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()

  document.title = "Bitter"

  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/home/:username" 
              element={user ? <Home /> : <Navigate to={`/home/${user?.username}`} />} 
            />
            <Route 
              path="/sign-in" 
              element={!user ? <Login /> : <Navigate to={`/home/${user?.username}`} />} 
            />
            <Route 
              path="/sign-up" 
              element={!user ? <Signup /> : <Navigate to={`/home/${user?.username}`} />} 
            />
            <Route 
              path="/" 
              element={<Posts />} 
            />
            <Route 
              path="/:user" 
              element={<User />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
    </>
  )
}

export default App
