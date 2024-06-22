const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.post('/webparser', async (req, res) => {
  const { url } = req.body;
  try {
    const response = await fetch('https://uptime-mercury-api.azurewebsites.net/webparser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching from Mercury API:', error);
    res.status(500).json({ error: 'Error fetching from Mercury API' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
