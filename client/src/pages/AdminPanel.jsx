import { useEffect, useState } from 'react'
import userService from '../services/userService'
import swapService from '../services/swapService'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdminPanel = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [users, setUsers] = useState([])
  const [swaps, setSwaps] = useState([])

  useEffect(() => {
    if (user?.role !== 'admin') navigate('/')
  }, [user, navigate])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res1 = await userService.getAllUsers()
        const res2 = await swapService.getAllSwaps()
        setUsers(res1.data)
        setSwaps(res2.data)
      } catch (err) {
        console.error('Admin data fetch error:', err)
      }
    }
    fetchData()
  }, [])

  const handleBanUser = async (userId) => {
    try {
      await userService.banUser(userId)
      alert('User banned successfully!')
      setUsers(users.map(u => (u._id === userId ? { ...u, banned: true } : u)))
    } catch (err) {
      alert('Error banning user.')
    }
  }

  const handleDeleteSwap = async (swapId) => {
    try {
      await swapService.deleteSwap(swapId)
      setSwaps(swaps.filter(s => s._id !== swapId))
    } catch (err) {
      alert('Failed to delete swap request.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-cyan-300 mb-10 animate-subtleTilt">
          🛠️ Admin Panel
        </h1>

        <div className="flex gap-4 mb-10">
          <button
            onClick={() => navigate('/admin/announcements')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium shadow-md"
          >
            📢 Manage Announcements
          </button>
          <button
            onClick={() => navigate('/admin/export')}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded font-medium shadow-md"
          >
            📊 Export Data
          </button>
        </div>

        {/* User Management */}
        <section className="mb-12 bg-gray-900 bg-opacity-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-semibold text-blue-200 mb-4">👥 All Users</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm bg-gray-800 rounded-md">
              <thead className="bg-blue-700 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">Name</th>
                  <th className="px-4 py-2 text-left">Email</th>
                  <th className="px-4 py-2 text-left">Role</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-b border-gray-600">
                    <td className="px-4 py-2">{u.name}</td>
                    <td className="px-4 py-2">{u.email}</td>
                    <td className="px-4 py-2 capitalize">{u.role}</td>
                    <td className="px-4 py-2">{u.banned ? '🚫 Banned' : '✅ Active'}</td>
                    <td className="px-4 py-2">
                      {!u.banned && (
                        <button
                          onClick={() => handleBanUser(u._id)}
                          className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600"
                        >
                          Ban
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Swap Requests */}
        <section className="bg-gray-900 bg-opacity-50 p-6 rounded-xl shadow-inner">
          <h2 className="text-2xl font-semibold text-green-200 mb-4">🔄 Pending Swap Requests</h2>
          {swaps.length === 0 ? (
            <p className="text-gray-400">No pending swaps found.</p>
          ) : (
            <div className="space-y-3">
              {swaps.map((s) => (
                <div
                  key={s._id}
                  className="bg-gray-800 p-4 rounded-lg flex justify-between items-start border border-gray-600"
                >
                  <div className="text-sm text-gray-200">
                    <p><strong>From:</strong> {s.sender?.name} → <strong>To:</strong> {s.receiver?.name}</p>
                    <p className="mt-1 italic text-blue-300">{s.message}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteSwap(s._id)}
                    className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 mt-1"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style>{`
        @keyframes subtleTilt {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
          50% { transform: rotateX(2deg) rotateY(2deg); }
        }
        .animate-subtleTilt {
          animation: subtleTilt 12s ease-in-out infinite;
          display: inline-block;
          transform-style: preserve-3d;
          perspective: 800px;
        }
      `}</style>
    </div>
  )
}

export default AdminPanel
