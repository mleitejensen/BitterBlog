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
          <h1>Logo</h1>
        <Link to="/">
          <h1>Bitter</h1>
        </Link>

        {user && (
          <div>
            <span>{user.username}</span>
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