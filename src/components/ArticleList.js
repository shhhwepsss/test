// src/components/Article.js
import React, { useContext, useState } from 'react';
import { FeedContext } from '../context/FeedContext';
import Modal from './Modal';
import './Article.css';

const Article = ({ article }) => {
    const { articles, setArticles } = useContext(FeedContext);
    const [showModal, setShowModal] = useState(false);

    const removeArticle = (id) => {
        const updatedArticles = articles.filter(article => article.id !== id);
        setArticles(updatedArticles);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="article-card">
            <div className="article-image" style={{ backgroundImage: `url(${article.enclosure?.link})` }}></div>
            <div className="article-content" onClick={openModal}>
                <div className="article-category">{article.categories[0] || 'Uncategorized'}</div>
                <p>{article.title}</p>
                <p>{article.description}</p>
                <div className="article-footer">
                    <div className="article-author">{article.author}</div>
                    <div className="article-date">{new Date(article.pubDate).toLocaleDateString()}</div>
                </div>
            </div>
            <button onClick={() => removeArticle(article.id)} className="remove-article-button">
                Remove
            </button>

            <Modal show={showModal} onClose={closeModal}>
                <h2>{article.title}</h2>
                <div className="modal-body">
                    <p>{article.description}</p>
                    <p>{article.content}</p>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
            </Modal>
        </div>
    );
};

export default Article;
