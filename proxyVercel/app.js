const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Article = require('./models/article'); 
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

//to-do: data to ENV
const dbURI = 'mongodb+srv://timofeybabisashvili:0z6mAu9hofWdhe2v@cluster0.wzvxecj.mongodb.net/lolo-db?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server started on port ${PORT}`)))
  .catch(err => console.error('Database connection error:', err));

app.post('/articles', (req, res) => {
  const { title, imageUrl, description, categories, author } = req.body;

  const article = new Article({
    title,
    imageUrl,
    description,
    categories,
    author
  });

  article.save()
    .then(result => res.status(201).json(result))
    .catch(err => res.status(500).json({ error: err.message }));
});
