import React from 'react';
import './Modal.css';

const ArticleModal = ({ article, closeModal }) => {
    const handleBackgroundClick = (e) => {
        if (e.target.classList.contains('modal-background')) {
            closeModal();
        }
    };

    const openArticle = async (url) => {
        try {
            const response = await fetch('https://uptime-mercury-api.azurewebsites.net/webparser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url })
            });
            const data = await response.json();
            console.log(data)
            return data.content; 
        } catch (error) {
            console.error("Failed to fetch article content", error);
            return null;
        }
    };

    const handleReadMoreClick = async (e) => {
        e.preventDefault();
        const content = await openArticle(article.link);
        if (content) {
            const newWindow = window.open();
            newWindow.document.write(content);
            newWindow.document.close();
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
                    <div className='article-content'>
                        <h2>{article.title}</h2>
                        <p className="article-description">{article.description}</p>
                        <div>
                            <a href="#" onClick={handleReadMoreClick} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleModal;
