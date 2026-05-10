import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/hooks/useAuth'
import '../styles/navbar.scss'

const Navbar = () => {
    const { handleLogout } = useAuth()
    const navigate = useNavigate()

    const onLogout = async () => {
        await handleLogout()
        navigate('/login')
    }

    return (
        <nav className="main-navbar">
            <div className="navbar-left">
                <Link to="/" className="logo">
                    Careerlens AI
                </Link>
            </div>
            <div className="navbar-center">
                <Link to="/" className="nav-link">Assessment</Link>
                <Link to="/reports" className="nav-link">Reports</Link>
            </div>
            <div className="navbar-right">
                <button onClick={onLogout} className="logout-btn">Logout</button>
            </div>
        </nav>
    )
}

export default Navbar
