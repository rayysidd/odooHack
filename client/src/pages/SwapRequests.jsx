import React, { useEffect, useState } from 'react'
import swapService from '../services/swapService'
import { useAuth } from '../context/AuthContext'

const SwapRequests = () => {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchRequests = async () => {
    try {
      const res = await swapService.getMyRequests()
      setRequests(res.data)
    } catch (err) {
      console.error('Failed to load swap requests:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const handleAccept = async (requestId) => {
    try {
      await swapService.acceptRequest(requestId)
      fetchRequests()
    } catch (err) {
      console.error('Accept failed:', err)
    }
  }

  const handleReject = async (requestId) => {
    try {
      await swapService.rejectRequest(requestId)
      fetchRequests()
    } catch (err) {
      console.error('Reject failed:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto bg-gray-900/80 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-blue-500/30">
        <h2 className="text-3xl font-bold text-blue-300 mb-6 animate-subtleTilt">🔁 My Swap Requests</h2>

        {loading ? (
          <p className="text-blue-300 animate-pulse">Loading swap requests...</p>
        ) : requests.length === 0 ? (
          <p className="text-blue-200">No swap requests yet.</p>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <div
                key={req._id}
                className="border border-blue-500/20 bg-blue-gray-800/30 p-4 rounded-lg shadow-sm hover:shadow-blue-400/40 transition"
              >
                <div className="text-sm mb-2 space-y-1">
                  <p>
                    <strong>From:</strong> {req.sender?.name}
                  </p>
                  <p>
                    <strong>To:</strong> {req.receiver?.name}
                  </p>
                  <p className="text-blue-200 mt-2">{req.message}</p>
                </div>

                {req.receiver?._id === user._id && req.status === 'pending' ? (
                  <div className="flex space-x-2 mt-3">
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <div
                    className={`mt-3 text-sm font-semibold ${
                      req.status === 'accepted' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {req.status.toUpperCase()}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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

export default SwapRequests
