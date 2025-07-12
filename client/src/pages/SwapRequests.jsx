// src/components/SwapRequestModal.jsx
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const SwapRequestModal = ({ isOpen, onClose, targetUser, onSubmit }) => {
  const { user } = useAuth()
  const [skillToOffer, setSkillToOffer] = useState('')
  const [skillToRequest, setSkillToRequest] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!skillToOffer || !skillToRequest || !message.trim()) return
    onSubmit({
      receiverId: targetUser._id,
      skillToOffer,
      skillToRequest,
      message: message.trim(),
    })
    resetForm()
  }

  const resetForm = () => {
    setSkillToOffer('')
    setSkillToRequest('')
    setMessage('')
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  // Mock current user skills for testing
  const currentUserSkills = user?.skills || [
    'React', 'Node.js', 'Python', 'JavaScript', 'HTML/CSS', 
    'UI/UX Design', 'Photography', 'Digital Marketing'
  ]

  if (!isOpen || !targetUser) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-gray-800 to-blue-gray-900 rounded-xl shadow-2xl w-full max-w-md p-6 relative text-white border border-blue-500 transform transition-all duration-300 scale-100">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center mb-6">
          <img
            src={targetUser.avatar}
            alt={targetUser.name}
            className="w-12 h-12 rounded-full border-2 border-blue-500 mr-4"
          />
          <div>
            <h2 className="text-xl font-semibold text-cyan-300">
              Skill Swap Request
            </h2>
            <p className="text-blue-400 font-medium">with {targetUser.name}</p>
          </div>
        </div>

        {/* Skill Selection */}
        <div className="space-y-4 mb-6">
          {/* Skill to Offer */}
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Skill I can offer
            </label>
            <select
              value={skillToOffer}
              onChange={(e) => setSkillToOffer(e.target.value)}
              className="w-full border border-slate-600 bg-gray-900 text-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select a skill you can teach</option>
              {currentUserSkills.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Skill to Request */}
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              Skill I want to learn
            </label>
            <select
              value={skillToRequest}
              onChange={(e) => setSkillToRequest(e.target.value)}
              className="w-full border border-slate-600 bg-gray-900 text-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            >
              <option value="">Select a skill you want to learn</option>
              {targetUser.skills?.map((skill, index) => (
                <option key={index} value={skill}>{skill}</option>
              ))}
            </select>
          </div>

          {/* Visual Swap Indicator */}
          {skillToOffer && skillToRequest && (
            <div className="flex items-center justify-center py-2">
              <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg px-4 py-2 flex items-center space-x-3">
                <span className="text-cyan-300 font-medium">{skillToOffer}</span>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <span className="text-blue-300 font-medium">{skillToRequest}</span>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-blue-200 mb-2">
            Additional Message
          </label>
          <textarea
            className="w-full border border-slate-600 bg-gray-900 text-gray-200 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
            rows={4}
            placeholder="Add any additional details about the swap, availability, or preferred learning format..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-3">
          <button
            onClick={handleClose}
            className="px-5 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!skillToOffer || !skillToRequest || !message.trim()}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-sm text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default SwapRequestModal