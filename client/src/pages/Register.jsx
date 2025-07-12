import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import authService from '../services/authService'

const Register = () => {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    location: '', // <-- NEW
  })

  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      console.log("Registering user with data:", form)
      const res = await authService.register(form)
      login(res.data.user)
      navigate('/')
    } catch (err) {
      console.error("Registration error:", err.response || err)
      setError(err.response?.data?.message || 'Registration failed.')
    }
  }

  const isFormValid = form.name && form.email && form.password && form.location

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-blue-gray-900 to-gray-900 px-6">
      <div className="bg-gradient-to-tr from-blue-700 to-blue-gray-800 shadow-lg rounded-2xl p-10 max-w-md w-full text-gray-100">
        <h2
          className="text-4xl font-bold mb-8 text-center tracking-tight bg-gradient-to-r from-cyan-400 via-blue-300 to-blue-500 bg-clip-text text-transparent select-none animate-subtleTilt"
        >
          Create Account
        </h2>

        {error && (
          <div className="bg-red-700 bg-opacity-75 px-5 py-3 rounded mb-6 text-sm font-semibold text-red-100 shadow-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Your full name"
              className="w-full px-5 py-3 rounded-md bg-gray-800 border border-gray-600 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              className="w-full px-5 py-3 rounded-md bg-gray-800 border border-gray-600 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="••••••••"
              className="w-full px-5 py-3 rounded-md bg-gray-800 border border-gray-600 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-semibold mb-2">Location</label>
            <input
              id="location"
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              required
              placeholder="City, Country"
              className="w-full px-5 py-3 rounded-md bg-gray-800 border border-gray-600 placeholder-gray-400 text-gray-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full font-semibold py-3 rounded-md shadow-md transition-colors duration-300 ${
              isFormValid
                ? 'bg-cyan-500 hover:bg-cyan-600 text-gray-900'
                : 'bg-cyan-800 text-gray-400 cursor-not-allowed'
            }`}
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-8 text-gray-400">
          Already have an account?{' '}
          <a href="/login" className="text-cyan-400 underline hover:text-cyan-500 transition">
            Login
          </a>
        </p>
      </div>

      <style>{`
        @keyframes subtleTilt {
          0%, 100% {
            transform: rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: rotateX(2deg) rotateY(2deg);
          }
        }
        .animate-subtleTilt {
          animation: subtleTilt 12s ease-in-out infinite;
          display: inline-block;
          transform-style: preserve-3d;
          perspective: 800px;
          cursor: default;
        }
      `}</style>
    </div>
  )
}

export default Register
