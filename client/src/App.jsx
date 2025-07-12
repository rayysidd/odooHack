// src/App.jsx
import React, { useState } from 'react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Profile from './pages/Profile'
import IncomingRequests from './components/IncomingRequests'
import SwapMatches from './components/SwapMatches'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'requests':
        return <IncomingRequests />
      case 'matches':
        return <SwapMatches />
      case 'profile':
        return <Profile />
      default:
        return <Home />
    }
  }

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900">
        <Navbar currentPage={currentPage} onPageChange={setCurrentPage} />
        <main>
          {renderPage()}
        </main>
      </div>
    </AuthProvider>
  )
}

export default App