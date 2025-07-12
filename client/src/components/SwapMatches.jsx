// src/components/SwapMatches.jsx
import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import swapService from '../services/swapService'

// Mock data for testing
const mockMatches = [
  {
    _id: '1',
    participants: [
      {
        _id: '1',
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=1',
        skillOffered: 'React',
        skillRequested: 'Python'
      },
      {
        _id: '2',
        name: 'Mike Chen',
        avatar: 'https://i.pravatar.cc/150?img=2',
        skillOffered: 'Python',
        skillRequested: 'React'
      }
    ],
    status: 'active',
    duration: '2 weeks',
    schedule: 'Weekends, 2 hours per session',
    progress: 65,
    startDate: new Date('2025-01-01T10:00:00Z'),
    endDate: new Date('2025-01-15T10:00:00Z'),
    sessions: [
      { date: '2025-01-01', completed: true, topic: 'React Basics' },
      { date: '2025-01-02', completed: true, topic: 'Python Fundamentals' },
      { date: '2025-01-08', completed: true, topic: 'React Hooks' },
      { date: '2025-01-09', completed: false, topic: 'Python Data Structures' },
      { date: '2025-01-15', completed: false, topic: 'React State Management' }
    ],
    lastActivity: new Date('2025-01-09T15:30:00Z')
  },
  {
    _id: '2',
    participants: [
      {
        _id: '1',
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=1',
        skillOffered: 'Node.js',
        skillRequested: 'UI/UX Design'
      },
      {
        _id: '3',
        name: 'Emma Davis',
        avatar: 'https://i.pravatar.cc/150?img=3',
        skillOffered: 'UI/UX Design',
        skillRequested: 'Node.js'
      }
    ],
    status: 'active',
    duration: '3 weeks',
    schedule: 'Weekdays after 6 PM',
    progress: 40,
    startDate: new Date('2025-01-05T18:00:00Z'),
    endDate: new Date('2025-01-26T18:00:00Z'),
    sessions: [
      { date: '2025-01-05', completed: true, topic: 'Design Principles' },
      { date: '2025-01-06', completed: true, topic: 'Express.js Basics' },
      { date: '2025-01-12', completed: false, topic: 'Figma Prototyping' },
      { date: '2025-01-13', completed: false, topic: 'RESTful APIs' }
    ],
    lastActivity: new Date('2025-01-06T19:45:00Z')
  },
  {
    _id: '3',
    participants: [
      {
        _id: '1',
        name: 'You',
        avatar: 'https://i.pravatar.cc/150?img=1',
        skillOffered: 'MongoDB',
        skillRequested: 'Docker'
      },
      {
        _id: '4',
        name: 'Alex Rodriguez',
        avatar: 'https://i.pravatar.cc/150?img=4',
        skillOffered: 'Docker',
        skillRequested: 'MongoDB'
      }
    ],
    status: 'completed',
    duration: '4 weeks',
    schedule: 'Flexible, prefer evenings',
    progress: 100,
    startDate: new Date('2024-12-01T19:00:00Z'),
    endDate: new Date('2024-12-29T19:00:00Z'),
    sessions: [
      { date: '2024-12-01', completed: true, topic: 'MongoDB Fundamentals' },
      { date: '2024-12-02', completed: true, topic: 'Docker Containers' },
      { date: '2024-12-08', completed: true, topic: 'Data Modeling' },
      { date: '2024-12-09', completed: true, topic: 'Docker Compose' },
      { date: '2024-12-15', completed: true, topic: 'Aggregation Pipeline' },
      { date: '2024-12-16', completed: true, topic: 'Kubernetes Basics' }
    ],
    lastActivity: new Date('2024-12-29T20:15:00Z'),
    rating: 4.8
  }
]

const SwapMatches = () => {
  const { user } = useAuth()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, active, completed

  const fetchMatches = async () => {
    try {
      // For testing, use mock data
      setTimeout(() => {
        setMatches(mockMatches)
        setLoading(false)
      }, 1000)
      
      // Uncomment when API is ready:
      // const res = await swapService.getMatches()
      // setMatches(res.data.matches || [])
      // setLoading(false)
    } catch (err) {
      console.error('Error fetching matches:', err)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMatches()
  }, [])

  const handleMarkComplete = async (matchId) => {
    try {
      setMatches(prev => prev.map(match => 
        match._id === matchId ? { ...match, status: 'completed', progress: 100 } : match
      ))
      
      alert('Match marked as completed!')
      
      // Uncomment when API is ready:
      // await swapService.markMatchComplete(matchId)
    } catch (err) {
      console.error('Error marking match complete:', err)
      alert('Failed to mark match as complete. Please try again.')
    }
  }

  const formatDate = (date) => {
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
      default: return 'bg-gray-600/30 text-gray-200 border-gray-500/30'
    }
  }

  const getOtherParticipant = (match) => {
    return match.participants.find(p => p.name !== 'You')
  }

  const getYourRole = (match) => {
    return match.participants.find(p => p.name === 'You')
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
            {['all', 'active', 'completed'].map((filterOption) => (
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
              const yourRole = getYourRole(match)
              
              return (
                <div
                  key={match._id}
                  className="bg-gradient-to-br from-gray-800 to-blue-gray-900 border border-blue-700 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-400"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={otherParticipant.avatar}
                        alt={otherParticipant.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                      />
                      <div>
                        <h3 className="text-lg font-semibold text-cyan-300">
                          {otherParticipant.name}
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
                      <p className="text-green-300 font-medium text-lg">{yourRole.skillOffered}</p>
                    </div>
                    <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
                      <p className="text-xs text-blue-200 mb-1">YOU LEARN</p>
                      <p className="text-blue-300 font-medium text-lg">{yourRole.skillRequested}</p>
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
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Recent Sessions</h4>
                    <div className="space-y-2">
                      {match.sessions.slice(-3).map((session, index) => (
                        <div key={index} className="flex items-center gap-3 text-sm">
                          <div className={`w-3 h-3 rounded-full ${
                            session.completed ? 'bg-green-500' : 'bg-gray-500'
                          }`}></div>
                          <span className="text-gray-400">{formatDate(session.date)}</span>
                          <span className="text-gray-300">{session.topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="text-sm text-gray-400 mb-6">
                    <p><span className="font-medium">Duration:</span> {match.duration}</p>
                    <p><span className="font-medium">Schedule:</span> {match.schedule}</p>
                    <p><span className="font-medium">Last Activity:</span> {formatDate(match.lastActivity)}</p>
                    {match.rating && (
                      <p><span className="font-medium">Rating:</span> ⭐ {match.rating}/5</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    {match.status === 'active' && (
                      <button
                        onClick={() => handleMarkComplete(match._id)}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                      >
                        Mark Complete
                      </button>
                    )}
                    <button className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
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