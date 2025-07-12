import React from 'react'

const UserCard = ({ user, onRequestSwap, className = '' }) => {
  return (
    <div
      className={`bg-gradient-to-br from-gray-800 to-blue-gray-900 border border-blue-700 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-cyan-500/50 ${className}`}
    >
      <img
        src={user.avatar || 'https://i.pravatar.cc/150?img=3'}
        alt={user.name}
        className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-blue-500 shadow-md"
      />
      <h2 className="text-xl font-semibold text-cyan-300">{user.name}</h2>
      <p className="text-sm text-blue-100 mb-4">
        {user.skills?.length > 0 ? user.skills.join(', ') : 'No skills listed'}
      </p>
      <button
        onClick={() => onRequestSwap(user)}
        className="bg-cyan-500 hover:bg-cyan-600 text-gray-900 font-semibold px-5 py-2 rounded-full shadow-md transition duration-200"
      >
        Request Swap
      </button>
    </div>
  )
}

export default UserCard
