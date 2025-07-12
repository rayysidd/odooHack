// src/components/UserCard.jsx
import React from 'react'

const UserCard = ({ user, onRequestSwap, className = '' }) => {
  return (
    <div
      className={`bg-gradient-to-br from-gray-800 to-blue-gray-900 border border-blue-700 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/30 hover:border-cyan-400 ${className}`}
    >
      <img
        src={user.avatar || 'https://i.pravatar.cc/150?img=3'}
        alt={user.name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500 shadow-md hover:border-cyan-400 transition-colors duration-300"
      />
      <h2 className="text-xl font-semibold text-cyan-300 mb-2">{user.name}</h2>
      <div className="mb-4">
        <p className="text-xs text-blue-200 mb-2 uppercase tracking-wide">Skills</p>
        <div className="flex flex-wrap gap-1 justify-center">
          {user.skills?.length > 0 ? (
            user.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-600/30 text-blue-200 px-2 py-1 rounded-full text-xs border border-blue-500/30"
              >
                {skill}
              </span>
            ))
          ) : (
            <span className="text-gray-400 text-sm">No skills listed</span>
          )}
        </div>
      </div>
      <button
        onClick={() => onRequestSwap(user)}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        Request Swap
      </button>
    </div>
  )
}

export default UserCard