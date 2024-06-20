import React, { useState } from 'react';

const AddArticleForm = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState('');
    const [author, setAuthor] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = new Date().toISOString(); 
        onSubmit({ id, imageUrl, title, description, categories: categories.split(','), author, pubDate: new Date().toISOString() });
        setTitle('');
        setDescription('');
        setCategories('');
        setAuthor('');
        setImageUrl('');
    };

    return (
        <form onSubmit={handleSubmit} key={title}>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article Title *"
                required
            />
            <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Image URL"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Article Description *"
                required
            />
            <input
                type="text"
                value={categories}
                onChange={(e) => setCategories(e.target.value)}
                placeholder="Categories (comma-separated) *"
                required
            />
            <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author *"
                required
            />
            <button type="submit">Add Article</button>
        </form>
    );
};

export default AddArticleForm;
