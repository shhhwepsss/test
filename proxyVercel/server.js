const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/webparser', async (req, res) => {
    const { url } = req.body;

    try {
        const response = await axios.post('https://uptime-mercury-api.azurewebsites.net/webparser', { url });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching the article:', error);
        res.status(500).json({ error: 'Failed to fetch the article' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
