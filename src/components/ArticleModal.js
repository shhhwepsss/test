import React, { useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FeedContext } from '../context/FeedContext';
import './Modal.css';

const ArticleModal = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { articles } = useContext(FeedContext);

    const article = articles.find(article => article.guid === id);

    if (!article) {
        return (
            <div className="modal-overlay" onClick={() => navigate('/')}>
                <div className="modal-content">
                    <p>Article not found</p>
                </div>
            </div>
        );
    }

    const closeModal = () => {
        navigate('/');
    };

    return (
        <div className="modal-overlay">
            <div className="modal-background" onClick={closeModal}></div>
            <div className="modal-content">
                <button onClick={closeModal} className="modal-close">
                    &times;
                </button>
                <div className="article-image" style={{ backgroundImage: `url(${article.enclosure?.link})` }}></div>
                <h2>{article.title}</h2>
                <div className="modal-body">
        
                    <p>{article.content}</p>
                    <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>

                </div>
            </div>
        </div>
    );
};

export default ArticleModal;
