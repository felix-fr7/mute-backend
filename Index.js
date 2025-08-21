// index.js
const express = require('express');
const loudness = require('loudness');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/api/volume', async (req, res) => {
  const { action } = req.body;
  
  try {
    if (action === 'mute') {
      await loudness.setMuted(true);
      res.send({ status: 'Muted', value: 'Muted' });
    } else if (action === 'unmute') {
      await loudness.setMuted(false);
      res.send({ status: 'Unmuted', value: 'Unmuted' });
    } else {
      res.status(400).send({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('Loudness Error:', error);
    res.status(500).send({ error: 'Failed to control volume' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});