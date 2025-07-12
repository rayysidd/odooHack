import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import AppRoutes from './routes/AppRoutes'
import { SocketProvider } from './context/SocketContext'
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SocketProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50">
            <AppRoutes />
          </main>
        </SocketProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
