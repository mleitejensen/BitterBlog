import { Link } from 'react-router-dom'
import '../App.css'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const {logout} = useLogout()
  const {user} = useAuthContext()

  const handleClick = () => {
    logout()
  }

  return (
    <header>
        <nav>
        <Link to="/">
          <h1>Logo</h1>
        </Link>
        <Link to="/home/:user">
          {!user && (
            <h1>Bitter</h1>
          )}
          {user && (
            <h1>Bitter - {user.username}</h1>
          )}
        </Link>

        {user && (
          <div>
            <button onClick={handleClick}>Logout</button>
          </div>
        )}
        {!user && (
          <div>
            <Link to="/login">
                Login
            </Link>
            <Link to="/signup">
                Signup
          </Link>
          </div>
        )}
        </nav>
    </header>
  )
}

export default Navbar