// routes/video.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

const HMS_TOKEN = process.env.HMS_MANAGEMENT_TOKEN;
const ROOM_ID = process.env.HMS_DEFAULT_ROOM_ID;

router.post('/token', async (req, res) => {
  const { userName, role = 'host' } = req.body;

  if (!userName) {
    return res.status(400).json({ error: "userName is required" });
  }

  try {
    const response = await axios.post(
      'https://api.100ms.live/v2/room-tokens/',
      {
        user_id: userName,
        role,
        room_id: ROOM_ID,
      },
      {
        headers: {
          Authorization: `Bearer ${HMS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return res.status(200).json({ token: response.data.token });
  } catch (error) {
    console.error('Error getting token:', error?.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to generate token' });
  }
});

module.exports = router;
