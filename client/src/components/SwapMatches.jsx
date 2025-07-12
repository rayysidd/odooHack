// src/components/SwapMatches.jsx
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import swapService from '../services/swapService'

const SwapMatches = () => {
  const { user } = useAuth()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState('all') // all, active, completed
  const [actionLoading, setActionLoading] = useState({})

  const fetchMatches = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await swapService.getMatches(filter)
      setMatches(response.matches || [])
    } catch (err) {
      console.error('Error fetching matches:', err)
      setError('Failed to load matches. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [filter])

  const handleMarkComplete = async (matchId) => {
    if (!window.confirm('Are you sure you want to mark this match as completed?')) {
      return
    }

    try {
      setActionLoading(prev => ({ ...prev, [matchId]: true }))
      
      await swapService.markMatchComplete(matchId)
      
      // Update local state
      setMatches(prev => prev.map(match => 
        match._id === matchId 
          ? { ...match, status: 'completed', progress: 100, completedAt: new Date() }
          : match
      ))
      
      alert('Match marked as completed!')
    } catch (err) {
      console.error('Error marking match complete:', err)
      alert('Failed to mark match as complete. Please try again.')
    } finally {
      setActionLoading(prev => ({ ...prev, [matchId]: false }))
    }
  }

  const handleCancelMatch = async (matchId) => {
    if (!window.confirm('Are you sure you want to cancel this match? This action cannot be undone.')) {
      return
    }

    try {
      setActionLoading(prev => ({ ...prev, [matchId]: true }))
      
      await swapService.cancelMatch(matchId)
      
      // Update local state
      setMatches(prev => prev.map(match => 
        match._id === matchId 
          ? { ...match, status: 'cancelled' }
          : match
      ))
      
      alert('Match cancelled successfully.')
    } catch (err) {
      console.error('Error cancelling match:', err)
      alert('Failed to cancel match. Please try again.')
    } finally {
      setActionLoading(prev => ({ ...prev, [matchId]: false }))
    }
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-600/30 text-green-200 border-green-500/30'
      case 'completed': return 'bg-blue-600/30 text-blue-200 border-blue-500/30'
      case 'cancelled': return 'bg-red-600/30 text-red-200 border-red-500/30'
      case 'paused': return 'bg-yellow-600/30 text-yellow-200 border-yellow-500/30'
      default: return 'bg-gray-600/30 text-gray-200 border-gray-500/30'
    }
  }

  const getOtherParticipant = (match) => {
    if (!user?._id) return null
    return match.participants.find(p => p.user._id !== user._id)
  }

  const getCurrentUserParticipant = (match) => {
    if (!user?._id) return null
    return match.participants.find(p => p.user._id === user._id)
  }

  const calculateAverageRating = (match) => {
    const ratings = match.participants.filter(p => p.rating).map(p => p.rating)
    if (ratings.length === 0) return null
    return (ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length).toFixed(1)
  }

  const filteredMatches = matches.filter(match => {
    if (filter === 'all') return true
    return match.status === filter
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mb-4"></div>
            <p className="text-blue-300 text-lg">Loading matches...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-lg mb-4">{error}</p>
            <button 
              onClick={fetchMatches}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-300 mb-4 animate-subtleTilt">
            🤝 Your Skill Swaps
          </h1>
          <p className="text-blue-200 max-w-2xl mx-auto">
            Track your ongoing and completed skill exchanges with fellow learners.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800/50 rounded-lg p-1 border border-blue-500/30">
            {['all', 'active', 'completed', 'cancelled', 'paused'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  filter === filterOption
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-blue-200 hover:text-white hover:bg-blue-600/50'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
                <span className="ml-2 text-xs">
                  ({matches.filter(m => filterOption === 'all' ? true : m.status === filterOption).length})
                </span>
              </button>
            ))}
          </div>
        </div>

        {filteredMatches.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-blue-400 text-lg">No matches found.</p>
            <p className="text-gray-400 text-sm mt-2">
              {filter === 'all' 
                ? 'Start connecting with others to begin your skill swap journey!'
                : `No ${filter} matches at the moment.`
              }
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredMatches.map((match) => {
              const otherParticipant = getOtherParticipant(match)
              const currentUserParticipant = getCurrentUserParticipant(match)
              const averageRating = calculateAverageRating(match)
              
              if (!otherParticipant || !currentUserParticipant) return null
              
              return (
                <div
                  key={match._id}
                  className="bg-gradient-to-br from-gray-800 to-blue-gray-900 border border-blue-700 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={otherParticipant.user.avatar || `https://ui-avatars.com/api/?name=${otherParticipant.user.name}&background=3b82f6&color=fff`}
                        alt={otherParticipant.user.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-cyan-300">
                          {otherParticipant.user.name}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(match.startDate)} - {formatDate(match.endDate)}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(match.status)}`}>
                      {match.status.toUpperCase()}
                    </span>
                  </div>

                  {/* Skill Exchange */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/30">
                      <p className="text-xs text-green-200 mb-1">YOU TEACH</p>
                      <p className="text-green-300 font-medium text-lg">{currentUserParticipant.skillOffered.skillName}</p>
                    </div>
                    <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                      <p className="text-xs text-blue-200 mb-1">YOU LEARN</p>
                      <p className="text-blue-300 font-medium text-lg">{currentUserParticipant.skillRequested.skillName}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-300">Progress</span>
                      <span className="text-sm text-blue-300">{match.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${match.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Sessions */}
                  {match.sessions && match.sessions.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-300 mb-3">Recent Sessions</h4>
                      <div className="space-y-2">
                        {match.sessions.slice(-3).map((session) => (
                          <div key={session._id} className="flex items-center gap-3 text-sm">
                            <div className={`w-3 h-3 rounded-full ${
                              session.completed ? 'bg-green-500' : 'bg-gray-500'
                            }`}></div>
                            <span className="text-gray-400">{formatDate(session.date)}</span>
                            <span className="text-gray-300">{session.topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Details */}
                  <div className="text-sm text-gray-400 mb-6">
                    <p><span className="font-medium">Duration:</span> {match.duration}</p>
                    <p><span className="font-medium">Schedule:</span> {match.schedule}</p>
                    <p><span className="font-medium">Last Activity:</span> {formatDate(match.lastActivity)}</p>
                    {averageRating && (
                      <p><span className="font-medium">Average Rating:</span> ⭐ {averageRating}/5</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {match.status === 'active' && (
                      <>
                        <button
                          onClick={() => handleMarkComplete(match._id)}
                          disabled={actionLoading[match._id]}
                          className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                          {actionLoading[match._id] ? 'Completing...' : 'Mark Complete'}
                        </button>
                        <button
                          onClick={() => handleCancelMatch(match._id)}
                          disabled={actionLoading[match._id]}
                          className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                        >
                          {actionLoading[match._id] ? 'Cancelling...' : 'Cancel'}
                        </button>
                      </>
                    )}
                    <button 
                      onClick={() => window.location.href = `/matches/${match._id}`}
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              )
            })}
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

export default SwapMatches