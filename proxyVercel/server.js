const express = require('express');
const cors = require('cors');

const app = express();
const port =  3001;

app.use(cors({ origin: "*" }));
app.use(express.json());

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

app.post('/webparser', async (req, res) => {
  const { url } = req.body;
  console.log("Received request for URL:", url);
  try {
    const response = await fetch('https://uptime-mercury-api.azurewebsites.net/webparser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url })
    });
    const data = await response.json();
    console.log("Response from Mercury API:", data);
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching from Mercury API:', error);
    res.status(500).json({ error: 'Error fetching from Mercury API' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
