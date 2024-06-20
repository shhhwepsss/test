import React, { useContext, useState } from 'react';
import { FeedContext } from '../context/FeedContext';
import Article from './Article';
import AddArticleForm from './AddArticleForm';
import ArticleModal from './ArticleModal';
import './Home.css';

const Home = () => {
    const { articles, addArticle } = useContext(FeedContext);
    const [filter, setFilter] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);

    const handleAddArticle = (newArticle) => {
        addArticle(newArticle); 
    };

    const handleOpenModal = (article) => {
        setSelectedArticle(article);
    };

    const handleCloseModal = () => {
        setSelectedArticle(null);
    };

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
                        placeholder="Filter by category..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                </div>
            </header>
            <div className="articles-grid">
                {filteredArticles.map(article => (
                    <Article key={article.id} article={article} openModal={handleOpenModal} />
                ))}
            </div>

            <div className="add-article-form">
                <h2>Add New Article</h2>
                <AddArticleForm onSubmit={handleAddArticle} />
            </div>

            {selectedArticle && <ArticleModal article={selectedArticle} closeModal={handleCloseModal} />}
        </div>
    );
};

export default Home;
