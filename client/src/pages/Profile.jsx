import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'

const Profile = () => {
  const { user, token } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    level: 'Beginner',
  })
  const [errors, setErrors] = useState({})
  const [success, setSuccess] = useState('')
  const [offeredSkills, setOfferedSkills] = useState(user?.skillsOffered || [])

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-200">
        <p className="text-lg animate-pulse">You must be logged in to view this page.</p>
      </div>
    )
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    setErrors({})
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(
        'http://localhost:8001/api/users/skills/offered',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      setSuccess(res.data.message)
      setOfferedSkills(prev => [...prev, {
        ...formData,
        approved: false,
      }])
      setFormData({ name: '', description: '', level: 'Beginner' })
    } catch (err) {
      const msg = err.response?.data?.errors || err.response?.data?.message
      setErrors(typeof msg === 'string' ? { global: msg } : msg.reduce((acc, cur) => {
        acc[cur.param] = cur.msg
        return acc
      }, {}))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 text-gray-100 py-20 px-4">
      <div className="max-w-3xl mx-auto bg-gray-900/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-blue-500/30">
        <h1 className="text-4xl font-bold text-blue-300 mb-8 animate-subtleTilt">👤 My Profile</h1>

        <div className="space-y-6 text-gray-200 mb-12">
          <div>
            <h2 className="text-lg font-semibold text-blue-400">Name:</h2>
            <p className="text-base">{user.name}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-blue-400">Email:</h2>
            <p className="text-base">{user.email}</p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-green-400 mt-8">🧠 Skills Offered:</h2>
            {offeredSkills.length > 0 ? (
              <ul className="list-disc list-inside mt-2 space-y-1">
                {offeredSkills.map((skill, idx) => (
                  <li key={idx} className="text-sm text-gray-300">
                    <span className="text-cyan-300 font-medium">{skill.name}</span> — {skill.level}
                    {skill.approved === false && (
                      <span className="ml-2 text-yellow-400 text-xs">(Pending approval)</span>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400 mt-2">No skills added yet.</p>
            )}
          </div>
        </div>

        {/* Add Skill Form */}
        <div className="mt-10 border-t border-blue-700 pt-6">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">➕ Add a Skill</h2>

          {success && <p className="text-green-400 mb-4">{success}</p>}
          {errors.global && <p className="text-red-400 mb-4">{errors.global}</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-300 mb-1">Skill Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500"
              />
              {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500"
              />
              {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-300 mb-1">Skill Level</label>
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-2 bg-gray-800 text-white rounded border border-gray-600 focus:border-blue-500"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Expert</option>
              </select>
              {errors.level && <p className="text-red-400 text-sm mt-1">{errors.level}</p>}
            </div>

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-lg transition"
            >
              Add Skill
            </button>
          </form>
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
