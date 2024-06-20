import React from 'react';
import './Modal.css';

const ArticleModal = ({ article, closeModal }) => {
    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('modal-background')) {
            closeModal();
        }
    };

    return (
        <div className="modal-background" onClick={handleBackgroundClick}>
            <div className="modal-active">
                <div className="modal-close" onClick={closeModal}>
                &times;
                </div>
                <div className="modal-window">
                    <div className="article-image" style={{ backgroundImage: `url(${article.imageUrl || article.enclosure?.link})` }}></div>
                    <div className='arcicle-content'>
                    <h2>{article.title}</h2>
                    <p className="article-description">{article.description}</p>
                    <div className="modal-body">
                        <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div></div>
                </div>
            </div>
        </div>
    );
};

export default ArticleModal;
