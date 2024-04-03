import { Link } from 'react-router-dom'
import '../App.css'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
  const {logout} = useLogout()

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

        <div>
          <button onClick={handleClick}>Logout</button>
        </div>
        <div>
          <Link to="/login">
              Login
          </Link>
          <Link to="/signup">
              Signup
        </Link>
        </div>
        </nav>
    </header>
  )
}

export default Navbar