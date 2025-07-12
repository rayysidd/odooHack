import axios from 'axios'

const API = import.meta.env.VITE_API_URL + '/api/swaps'

// Send a new swap request
const sendRequest = (data) => axios.post(`${API}/request`, data)

// Get swap requests related to the logged-in user
const getMyRequests = () => axios.get(`${API}/my`)

// Accept a swap request by ID
const acceptRequest = (id) => axios.post(`${API}/${id}/accept`)

// Reject a swap request by ID
const rejectRequest = (id) => axios.post(`${API}/${id}/reject`)

// Admin: get all swap requests
const getAllSwaps = () => axios.get(`${API}/all`)

// Admin: delete a swap request by ID
const deleteSwap = (id) => axios.delete(`${API}/${id}`)

export default {
  sendRequest,
  getMyRequests,
  acceptRequest,
  rejectRequest,
  getAllSwaps,
  deleteSwap,
}
