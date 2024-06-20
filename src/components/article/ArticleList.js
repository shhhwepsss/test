import React from 'react';
import Article from './Article';
import './Home.css';

const ArticleList = ({ articles, openModal }) => {
    return (
        <div className="article-list">
            {articles.map(article => (
                <Article
                    key={article.id}
                    article={article}
                    openModal={openModal}
                />
            ))}
        </div>
    );
};

export default ArticleList;
