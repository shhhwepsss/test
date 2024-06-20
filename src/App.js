import React, { useState } from 'react';
import { FeedProvider } from './context/FeedContext';
import Home from './components/Home';
import ArticleModal from './components/ArticleModal';
import './components/Home.css';

const App = () => {
    const [selectedArticle, setSelectedArticle] = useState(null);

    const openModal = (article) => {
        setSelectedArticle(article);
    };

    const closeModal = () => {
        setSelectedArticle(null);
    };

    return (
        <FeedProvider>
            <div>
                <Home openModal={openModal} />
                {selectedArticle && <ArticleModal article={selectedArticle} closeModal={closeModal} />}
            </div>
        </FeedProvider>
    );
};

export default App;
