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

  const closeMenu = () => setMenuOpen(false)

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
        {user && <Link to="/chat" className="hover:text-blue-400 transition">Chat</Link>}

        {user?.role === 'admin' && (
          <>
            <Link to="/admin" className="hover:text-red-400 transition">Admin</Link>
            <Link to="/admin/announcements" className="hover:text-red-400 transition">Announcements</Link>
            <Link to="/admin/export" className="hover:text-red-400 transition">Export</Link>
          </>
        )}

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
          <Link to="/" onClick={closeMenu} className="w-full hover:text-blue-400">Home</Link>
          {user && <Link to="/profile" onClick={closeMenu} className="w-full hover:text-blue-400">Profile</Link>}
          {user && <Link to="/swaprequests" onClick={closeMenu} className="w-full hover:text-blue-400">Swaps</Link>}
          {user && <Link to="/chat" onClick={closeMenu} className="w-full hover:text-blue-400">Chat</Link>}

          {user?.role === 'admin' && (
            <>
              <Link to="/admin" onClick={closeMenu} className="w-full hover:text-red-400">Admin</Link>
              <Link to="/admin/announcements" onClick={closeMenu} className="w-full hover:text-red-400">Announcements</Link>
              <Link to="/admin/export" onClick={closeMenu} className="w-full hover:text-red-400">Export</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" onClick={closeMenu} className="w-full hover:text-blue-400">Login</Link>
              <Link to="/register" onClick={closeMenu} className="w-full hover:text-blue-400">Register</Link>
            </>
          ) : (
            <button
              onClick={() => {
                handleLogout()
                closeMenu()
              }}
              className="w-full text-red-400 hover:text-red-500 text-left"
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
