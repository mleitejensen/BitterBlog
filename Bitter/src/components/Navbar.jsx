import { Link } from 'react-router-dom'
import '../App.css'

const Navbar = () => {

  return (
    <header>
        <nav>
          <h1>Logo</h1>
        <Link to="/">
          <h1>Bitter</h1>
        </Link>
        <Link to="/login">
            <h1>Login</h1>
        </Link>
        </nav>
    </header>
  )
}

export default Navbar