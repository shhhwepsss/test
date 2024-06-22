import React, { useState, useEffect } from 'react';
import './Modal.css';

const ArticleModal = ({ article, closeModal }) => {
    const [excerpt, setExcerpt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchExcerpt = async (url) => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('/webparser', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url })
                });
                const data = await response.json();
                if (data && data.excerpt) {
                    setExcerpt(data.excerpt);
                } else {
                    setError("Can't get full article, please click on 'Read more'");
                }
            } catch (error) {
                setError("Can't get full article, please click on 'Read more'");
            } finally {
                setLoading(false);
            }
        };

        fetchExcerpt(article.link);
    }, [article.link]);

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
                    <div className='article-content'>
                        <h2>{article.title}</h2>
                        <p className="article-description">{excerpt || article.description}</p>
                        {error && <p className="error">{error}</p>}
                        {loading && <p>Loading...</p>}
                        <div>
                            <a href={article.link} target="_blank" rel="noopener noreferrer">Read more</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArticleModal;
