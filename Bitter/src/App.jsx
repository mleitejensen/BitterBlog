import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Posts from './pages/Posts'
import User from './pages/User'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/home/:user" 
              element={<Home />} 
            />
            <Route 
              path="/login" 
              element={<Login />} 
            />
            <Route 
              path="/signup" 
              element={<Signup />} 
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
