const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const port = 3001;

app.use(cors({ origin: "*" }));
app.use(express.json());

// Define your route to handle the POST request and proxy to external API
app.post('/webparser', async (req, res) => {
  const { url } = req.body;
  console.log("Received request for URL:", url);
  
  try {
    const response = await fetch('https://uptime-mercury-api.azurewebsites.net/webparser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': '*/*'
      },
      body: JSON.stringify({ url })
    });
    
    const data = await response.json();
    console.log("Response from Mercury API:", data);
    
    // Return the data received from the external API
    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching from Mercury API:', error);
    res.status(500).json({ error: 'Error fetching from Mercury API' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});
