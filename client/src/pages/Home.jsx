import React, { useEffect, useState } from 'react'
import userService from '../services/userService'
import swapService from '../services/swapService'
import { useAuth } from '../context/AuthContext'
import UserCard from '../components/UserCard'
import SwapRequestModal from '../components/SwapRequestModal'

const Home = () => {
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedUser, setSelectedUser] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await userService.getAllUsers()
      const filtered = res.data.filter(u => u._id !== user?._id)
      setUsers(filtered)
    } catch (err) {
      console.error('Error fetching users:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (user) fetchUsers()
  }, [user])

  const handleRequestSwap = (targetUser) => {
    setSelectedUser(targetUser)
    setModalOpen(true)
  }

  const handleSendSwap = async ({ receiverId, message }) => {
    try {
      await swapService.sendRequest({ receiverId, message })
      alert('Swap request sent successfully!')
      setModalOpen(false)
    } catch (err) {
      console.error('Swap request error:', err)
      alert('Failed to send request.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 relative overflow-x-hidden">
      <header className="py-28 text-center relative z-20 px-6 max-w-4xl mx-auto">
        <h1
          className="text-6xl sm:text-7xl font-semibold tracking-tight bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-400 bg-clip-text text-transparent select-none animate-subtleTilt"
          style={{ textShadow: '0 4px 10px rgba(0,0,0,0.7)' }}
        >
          SkillSwap
        </h1>
        <div className="mx-auto mt-4 mb-8 w-20 h-1 bg-blue-400 rounded-full shadow-lg"></div>
        <p className="max-w-xl mx-auto text-lg sm:text-xl font-light tracking-wide text-blue-300 animate-gradientShift">
          Learn, Connect, and Grow — Exchange your skills with confidence.
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-28 relative z-10">
        {loading ? (
          <p className="text-center text-blue-300 text-lg animate-pulse mt-12">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-blue-400 text-lg mt-12">No users found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {users.map((u) => (
              <UserCard
                key={u._id}
                user={u}
                onRequestSwap={handleRequestSwap}
                className="bg-blue-gray-800 rounded-xl shadow-md hover:shadow-blue-600 transition transform hover:-translate-y-1 hover:scale-105 cursor-pointer"
              />
            ))}
          </div>
        )}
      </main>

      <SwapRequestModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        targetUser={selectedUser}
        onSubmit={handleSendSwap}
      />

      {/* Subtle floating shapes */}
      <div
        aria-hidden="true"
        className="fixed top-24 right-12 w-48 h-48 bg-blue-600 opacity-30 rounded-full blur-3xl animate-floatSlow shadow-blue-500/70"
      ></div>
      <div
        aria-hidden="true"
        className="fixed bottom-28 left-10 w-72 h-72 bg-blue-gray-700 opacity-20 rounded-full blur-3xl animate-floatSlow delay-3000 shadow-blue-600/60"
      ></div>
      <div
        aria-hidden="true"
        className="fixed top-40 left-1/2 w-40 h-40 bg-cyan-600 opacity-20 rounded-full blur-3xl animate-floatSlow delay-1500 shadow-cyan-400/60"
        style={{ transform: 'translateX(-50%)' }}
      ></div>

      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        @keyframes subtleTilt {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
          50% { transform: rotateX(2deg) rotateY(2deg); }
        }

        .animate-gradientShift {
          background-size: 200% 200%;
          animation: gradientShift 8s ease infinite;
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          display: inline-block;
        }

        .animate-floatSlow {
          animation: floatSlow 12s ease-in-out infinite;
        }

        .animate-subtleTilt {
          animation: subtleTilt 12s ease-in-out infinite;
          display: inline-block;
          transform-style: preserve-3d;
          perspective: 800px;
          cursor: default;
        }
      `}</style>
    </div>
  )
}

export default Home
