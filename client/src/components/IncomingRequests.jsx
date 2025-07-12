import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import swapService from '../services/swapService'

const IncomingRequests = () => {
  const { user } = useAuth()
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await swapService.getIncomingRequests(user?.token)
        setRequests(res.data.requests || [])
      } catch (err) {
        console.error('Error fetching requests:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRequests()
  }, [user?.token])

  const handleRequestResponse = async (requestId, status) => {
    try {
      await swapService.respondToRequest(requestId, status)
      setRequests(prev =>
        prev.map(req =>
          req._id === requestId ? { ...req, status } : req
        )
      )

      const requester = requests.find(r => r._id === requestId)?.requester?.name || 'The user'
      alert(`Request from ${requester} ${status === 'accepted' ? 'accepted' : 'rejected'} successfully!`)
    } catch (err) {
      console.error('Error responding to request:', err)
      alert('Failed to respond to request. Please try again.')
    }
  }

  const formatDate = (date) =>
    new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-600/30 text-yellow-200 border-yellow-500/30',
      accepted: 'bg-green-600/30 text-green-200 border-green-500/30',
      rejected: 'bg-red-600/30 text-red-200 border-red-500/30',
    }
    return colors[status] || 'bg-gray-600/30 text-gray-200 border-gray-500/30'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-blue-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
          <p className="text-lg">Loading requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-300 mb-4 animate-subtleTilt">
            📨 Incoming Requests
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Review and respond to skill swap requests from other learners in the community.
          </p>
        </div>

        {requests.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-blue-400 text-lg">No incoming requests yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              When others want to swap skills with you, they'll appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {requests.map((request) => (
              <div
                key={request._id}
                className="bg-gradient-to-br from-gray-800 to-blue-gray-900 border border-blue-700 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  {/* Requester Info */}
                  <div className="flex items-center gap-4 md:w-1/3">
                    <img
                      src={request.requester.avatar}
                      alt={request.requester.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-blue-500"
                    />
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300">
                        {request.requester.name}
                      </h3>
                      <p className="text-sm text-blue-200">{request.requester.email}</p>
                      <p className="text-xs text-gray-400">{formatDate(request.createdAt)}</p>
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(request.status)}`}>
                        {request.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="bg-green-600/20 p-3 rounded-lg border border-green-500/30">
                        <p className="text-xs text-green-200 mb-1">THEY OFFER</p>
                        <p className="text-green-300 font-medium">{request.skillOffered.skillName}</p>
                      </div>
                      <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30">
                        <p className="text-xs text-blue-200 mb-1">THEY WANT</p>
                        <p className="text-blue-300 font-medium">{request.skillRequested.skillName}</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-300 mb-2">
                        <span className="font-medium">Message:</span> {request.message}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <p><span className="font-medium">Duration:</span> {request.proposedDuration}</p>
                        <p><span className="font-medium">Schedule:</span> {request.proposedSchedule}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {request.status === 'pending' && (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleRequestResponse(request._id, 'accepted')}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleRequestResponse(request._id, 'rejected')}
                          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
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

export default IncomingRequests
