import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-slate-800 shadow-lg px-6 py-4 flex justify-between items-center relative">
      <Link to="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition">
        SkillSwap
      </Link>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center text-slate-300">
        <Link to="/" className="hover:text-blue-400 transition">Home</Link>
        {user && <Link to="/profile" className="hover:text-blue-400 transition">Profile</Link>}
        {user && <Link to="/swaprequests" className="hover:text-blue-400 transition">Swaps</Link>}
        {user?.role === 'admin' && <Link to="/admin" className="hover:text-blue-400 transition">Admin</Link>}

        {!user ? (
          <>
            <Link to="/login" className="hover:text-blue-400 transition">Login</Link>
            <Link to="/register" className="hover:text-blue-400 transition">Register</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-400 hover:text-red-500 transition"
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          className="text-slate-300 hover:text-blue-400 transition"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-slate-900 flex flex-col items-start px-6 py-6 shadow-lg space-y-4 z-20 md:hidden text-slate-300">
          <Link to="/" className="w-full" onClick={() => setMenuOpen(false)}>
            <span className="block w-full hover:text-blue-400 transition">Home</span>
          </Link>
          {user && (
            <Link to="/profile" className="w-full" onClick={() => setMenuOpen(false)}>
              <span className="block w-full hover:text-blue-400 transition">Profile</span>
            </Link>
          )}
          {user && (
            <Link to="/swaprequests" className="w-full" onClick={() => setMenuOpen(false)}>
              <span className="block w-full hover:text-blue-400 transition">Swaps</span>
            </Link>
          )}
          {user?.role === 'admin' && (
            <Link to="/admin" className="w-full" onClick={() => setMenuOpen(false)}>
              <span className="block w-full hover:text-blue-400 transition">Admin</span>
            </Link>
          )}
          {!user ? (
            <>
              <Link to="/login" className="w-full" onClick={() => setMenuOpen(false)}>
                <span className="block w-full hover:text-blue-400 transition">Login</span>
              </Link>
              <Link to="/register" className="w-full" onClick={() => setMenuOpen(false)}>
                <span className="block w-full hover:text-blue-400 transition">Register</span>
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout()
                setMenuOpen(false)
              }}
              className="w-full text-red-400 hover:text-red-500 transition text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
