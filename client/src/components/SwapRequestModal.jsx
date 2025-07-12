import React, { useState } from 'react'

const SwapRequestModal = ({ isOpen, onClose, targetUser, onSubmit }) => {
  const [message, setMessage] = useState('')

  const handleSubmit = () => {
    if (!message.trim()) return
    onSubmit({
      receiverId: targetUser._id,
      message: message.trim(),
    })
    setMessage('')
    onClose()
  }

  if (!isOpen || !targetUser) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gradient-to-br from-gray-800 to-blue-gray-900 rounded-xl shadow-2xl w-[90%] max-w-md p-6 relative text-white border border-blue-500">
        <h2 className="text-2xl font-semibold mb-4 text-cyan-300 tracking-tight">
          Swap Request to <span className="text-blue-400">{targetUser.name}</span>
        </h2>

        <textarea
          className="w-full border border-slate-600 bg-gray-900 text-gray-200 rounded p-3 mb-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={5}
          placeholder="Explain your swap request clearly..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-sm text-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-cyan-500 hover:bg-cyan-600 text-sm text-gray-900 font-semibold transition"
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  )
}

export default SwapRequestModal
