const AdminAnnouncements = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 px-6 py-16">
      <div className="max-w-4xl mx-auto bg-gradient-to-tr from-blue-700 to-blue-gray-800 shadow-xl rounded-2xl p-8">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-cyan-300 animate-subtleTilt">
          📢 Admin Announcements
        </h1>
        <p className="text-lg text-blue-100 mb-6">
          Welcome to the announcement panel. Here you can create, update, and manage platform-wide announcements.
        </p>

        {/* Placeholder box for future announcement management features */}
        <div className="border border-cyan-500 rounded-lg p-6 text-blue-300 bg-gray-900 bg-opacity-50 shadow-inner">
          🛠 Announcement features coming soon... Add forms, lists, or editing tools here.
        </div>
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

export default AdminAnnouncements
