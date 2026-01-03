const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = 3001;

const PLEX_URL = 'http://localhost:32400';
const PLEX_TOKEN = process.env.PLEX_TOKEN || '';

app.use(cors());
app.use(express.json());

// Get all libraries
app.get('/api/libraries', async (req, res) => {
  try {
    const response = await axios.get(`${PLEX_URL}/library/sections`, {
      headers: { 'X-Plex-Token': PLEX_TOKEN }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get library content
app.get('/api/library/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `${PLEX_URL}/library/sections/${req.params.id}/all`,
      { headers: { 'X-Plex-Token': PLEX_TOKEN } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get stream URL
app.get('/api/stream/:key', async (req, res) => {
  const streamUrl = `${PLEX_URL}${req.params.key}?X-Plex-Token=${PLEX_TOKEN}`;
  res.json({ url: streamUrl });
});

// Get watchlist
app.get('/api/watchlist', async (req, res) => {
  try {
    const response = await axios.get(
      `${PLEX_URL}/library/sections/watchlist/all`,
      { headers: { 'X-Plex-Token': PLEX_TOKEN } }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Watchlist error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Proxy thumbnails
app.get('/api/thumbnail/*', async (req, res) => {
  try {
    const thumbPath = req.params[0];
    const response = await axios.get(
      `${PLEX_URL}/${thumbPath}?X-Plex-Token=${PLEX_TOKEN}`,
      { responseType: 'stream' }
    );
    response.data.pipe(res);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend running on http://0.0.0.0:${PORT}`);
  console.log(`Access from device using your computer's IP address`);
});
