
import React, { useContext, useState, useEffect } from 'react';
import { FeedContext } from '../context/FeedContext';
import Article from './Article';
import './Home.css';

const Home = () => {
    const { articles } = useContext(FeedContext);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        console.log('Articles:', articles);
    }, [articles]);

    const filteredArticles = filter
        ? articles.filter(article =>
            article.categories.some(category => category.toLowerCase().includes(filter.toLowerCase()))
        ).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        : articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    return (
        <div>
      <header className="header">
            <h1 className="title">Lolo v5</h1>
            <div className="search-container">
                <input
                    className='filter'
                    type="text"
                    placeholder="Filer by category..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
            </div>
        </header>
            <div className="articles-grid">
                {filteredArticles.map(article => (
                    <Article key={article.guid} article={article} />
                ))}
            </div>
        </div>
    );
};

export default Home;
