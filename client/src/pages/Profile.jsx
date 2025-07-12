import React from 'react'
import { useAuth } from '../context/AuthContext'

const Profile = () => {
  const { user } = useAuth()

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-200">
        <p className="text-lg animate-pulse">You must be logged in to view this page.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-500/30">
        <h1 className="text-4xl font-bold text-blue-300 mb-8 animate-subtleTilt">👤 My Profile</h1>

        <div className="space-y-6 text-gray-200">
          <div>
            <h2 className="text-lg font-semibold text-blue-400">Name:</h2>
            <p className="text-base">{user.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-400">Email:</h2>
            <p className="text-base">{user.email}</p>
          </div>
          {/* You can add skills, bio, or profile image here */}
        </div>
      </div>

      <style>{`
        @keyframes subtleTilt {
          0%, 100% { transform: rotateX(0deg) rotateY(0deg); }
          50% { transform: rotateX(2deg) rotateY(2deg); }
        }
        .animate-subtleTilt {
          animation: subtleTilt 10s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>
    </div>
  )
}

export default Profile
