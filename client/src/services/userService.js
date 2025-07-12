import axios from 'axios'

const API = import.meta.env.VITE_API_URL + '/api/users'

// Get all users
const getAllUsers = () => axios.get(API)

// Get a single user by ID
const getUserById = (id) => axios.get(`${API}/${id}`)

// Ban a user (admin only)
const banUser = (id) => axios.post(`${API}/${id}/ban`)

export default {
  getAllUsers,
  getUserById,
  banUser,
}
