import React from 'react';
import './Article.css';

const Article = ({ article, openModal }) => {


    
    const truncateTitle = (title, maxLength) => {
        if (title.length > maxLength) {
            return title.slice(0, maxLength) + '...';
        }
        return title;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const getCategoryBadgeColor = (category) => {
        switch (category.toLowerCase()) {
            case 'technology':
                return 'green';
            case 'authentication':
                return 'black';
            default:
                return 'yellow';
        }
    };

    return (
        <div className="article-card" onClick={() => openModal(article)}>
            <div className="article-image" style={{ 
                backgroundImage: `url(${article.imageUrl || article.enclosure?.link})`
            }}>
            </div>
            <div className="article-content">
                <div className={`article-category article-badge ${getCategoryBadgeColor(article.categories[0] || 'Uncategorized')}`}>
                    {article.categories[0] || 'Uncategorized'}
                </div>
                <h3 className="article-title">{truncateTitle(article.title, 70)}</h3>
                <p className="article-description">{article.description}</p>
                <div className="article-footer no-pointer">
                    <div className="article-author">{article.author || 'No Author'}</div>
                    <div className="article-date">{formatDate(article.pubDate || new Date())}</div>
                </div>
            </div>
        </div>
    );
};

export default Article;
