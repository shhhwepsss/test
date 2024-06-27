const express = require('express');
const cors = require('cors');
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()


// const { MongoClient, ServerApiVersion } = require('mongodb');

// // connect mongoDB
// const uri = 'mongodb+srv://timofeybabisashvili:oCH4AMYdLvrWpzuf@clusterlolo.jnckfsl.mongodb.net/?retryWrites=true&w=majority&appName=ClusterLolo';

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);



// const app = express()
const port =  3008;

// const dbUri = 'mongodb+srv://timofeybabisashvili:0z6mAu9hofWdhe2v@cluster0.wzvxecj.mongodb.net/?retryWrites=true&w=majority&lolo-db=Cluster0';

// mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true})
// .then((result)=> app.listen(`${port}`))
// .catch((err)=>console.log(err))


// app.set('view engine', 'ejs')
// app.use(express.static('public'));
// app.use(morgan('dev'))
// app.listen(3301)

app.use(cors({ origin: "*" }));
app.use(express.json());
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
app.post('/webparser', async (req, res) => {
  const { url } = req.query;

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
    

    res.status(response.status).json(data);
  } catch (error) {
    console.error('Error fetching from Mercury API:', error);
    res.status(500).json({ error: 'Error fetching from Mercury API' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server running on port ${port}`);
});

