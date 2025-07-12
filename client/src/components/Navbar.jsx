// src/components/Navbar.jsx
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Navbar = ({ currentPage, onPageChange }) => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'requests', label: 'Requests', icon: '📨' },
    { id: 'matches', label: 'Matches', icon: '🤝' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ]

  const handleNavClick = (pageId) => {
    onPageChange(pageId)
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  const handleLogin = () => {
    onPageChange('login')
    setIsMenuOpen(false)
  }

  return (
    <nav className="bg-gray-900/95 backdrop-blur-md border-b border-blue-500/30 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => handleNavClick('home')}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-cyan-300 transition-all duration-300"
            >
              SkillSwap
            </button>
          </div>

          {/* Show different content based on auth state */}
          {user ? (
            <>
              {/* Desktop Navigation - Logged In */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        currentPage === item.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-300 hover:bg-blue-600/50 hover:text-white'
                      }`}
                    >
                      <span className="text-base">{item.icon}</span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* User Menu - Logged In */}
              <div className="hidden md:block">
                <div className="ml-4 flex items-center md:ml-6">
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center gap-2 text-sm rounded-full text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    >
                      <img
                        src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                        alt={user?.name || 'User'}
                        className="w-8 h-8 rounded-full border-2 border-blue-500"
                      />
                      <span className="font-medium">{user?.name || 'User'}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isMenuOpen ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg border border-blue-500/30 z-50">
                        <div className="py-1">
                          <button
                            onClick={() => handleNavClick('profile')}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-blue-600/50 hover:text-white transition-colors duration-200"
                          >
                            👤 Profile
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-red-600/50 hover:text-white transition-colors duration-200"
                          >
                            🚪 Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Desktop Navigation - Logged Out */}
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      currentPage === 'home'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-blue-600/50 hover:text-white'
                    }`}
                  >
                    <span className="text-base">🏠</span>
                    Home
                  </button>
                  <button
                    onClick={() => handleNavClick('about')}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                      currentPage === 'about'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-blue-600/50 hover:text-white'
                    }`}
                  >
                    <span className="text-base">ℹ️</span>
                    About
                  </button>
                </div>
              </div>

              {/* Login Button - Logged Out */}
              <div className="hidden md:block">
                <button
                  onClick={handleLogin}
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
                >
                  <span className="text-base">🔐</span>
                  Sign In
                </button>
              </div>
            </>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-blue-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            >
              <svg
                className={`w-6 h-6 transition-transform duration-200 ${
                  isMenuOpen ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md border-t border-blue-500/30">
            {user ? (
              <>
                {/* Mobile Navigation - Logged In */}
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-3 ${
                      currentPage === item.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-300 hover:bg-blue-600/50 hover:text-white'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
                
                {/* User Info */}
                <div className="pt-4 pb-2 border-t border-blue-500/30">
                  <div className="flex items-center gap-3 px-3 py-2">
                    <img
                      src={user?.avatar || 'https://i.pravatar.cc/150?img=1'}
                      alt={user?.name || 'User'}
                      className="w-8 h-8 rounded-full border-2 border-blue-500"
                    />
                    <span className="text-gray-300 font-medium">{user?.name || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:bg-red-600/50 hover:text-white transition-colors duration-200 flex items-center gap-3"
                  >
                    <span className="text-lg">🚪</span>
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Mobile Navigation - Logged Out */}
                <button
                  onClick={() => handleNavClick('home')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-3 ${
                    currentPage === 'home'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-blue-600/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">🏠</span>
                  Home
                </button>
                <button
                  onClick={() => handleNavClick('about')}
                  className={`w-full text-left px-3 py-2 rounded-md text-base font-medium transition-all duration-200 flex items-center gap-3 ${
                    currentPage === 'about'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-blue-600/50 hover:text-white'
                  }`}
                >
                  <span className="text-lg">ℹ️</span>
                  About
                </button>
                
                {/* Login Button - Mobile */}
                <div className="pt-4 pb-2 border-t border-blue-500/30">
                  <button
                    onClick={handleLogin}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-3 py-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center gap-2"
                  >
                    <span className="text-lg">🔐</span>
                    Sign In
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar