// src/components/Article.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Article.css';

const Article = ({ article }) => {
    console.log('Rendering article:', article);
    return (
        <div className="article-card">
            <Link to={`/article/${article.guid}`}>
                <div className="article-image" style={{ backgroundImage: `url(${article.enclosure?.link})` }}></div>
                <div className="article-content">
                    <div className="article-category">{article.categories[0] || 'Uncategorized'}</div>
                    <p >{article.title}</p>
                    <p>{article.description}</p>
                    <div className="article-footer">
                        <div className="article-author">{article.author}</div>
                        <div className="article-date">{new Date(article.pubDate).toLocaleDateString()}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Article;
