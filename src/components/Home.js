import React, { useContext, useState } from 'react';
import { FeedContext } from '../context/FeedContext';
import Article from './article/Article';
import ArticleModal from './article/articleModal/ArticleModal';
import AddArticleModal from './article/articleModal/addArticleModal/AddArticleModal';
import './Home.css';

const Home = () => {
    const { articles, addArticle, removeArticle, editArticle } = useContext(FeedContext);
    const [filter, setFilter] = useState('');
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [showAddArticleModal, setShowAddArticleModal] = useState(false);

    const handleAddArticle = (newArticle) => {
        addArticle(newArticle);
        setShowAddArticleModal(false);
    };

    const handleEditArticle = (updatedArticle) => {
        editArticle(updatedArticle);
        setShowAddArticleModal(false);
    };

    const handleOpenModal = (article) => {
        setSelectedArticle(article);
    };

    const handleCloseModal = () => {
        setSelectedArticle(null);
        setShowAddArticleModal(false);
    };

    const handleOpenAddArticleModal = () => {
        setSelectedArticle(null);
        setShowAddArticleModal(true);
    };

    const handleOpenEditArticleModal = (article) => {
        setSelectedArticle(article);
        setShowAddArticleModal(true);
    };

    const filteredArticles = filter
        ? articles.filter(article =>
            article.categories.some(category => category.toLowerCase().includes(filter.toLowerCase()))
        ).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        : articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

    return (
        <div>
            <header className="header">
                <div className="search-container">
                    <input
                        className='filter'
                        type="text"
                        placeholder="Filter by category..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <div className='button-container'>
                        <button className='create-article-button' onClick={handleOpenAddArticleModal}>Add new article</button>
                    </div>
                </div>
            </header>
            <div className="articles-grid">
                {filteredArticles.map(article => (
                    <Article 
                        key={article.pubDate} 
                        article={article} 
                        openModal={handleOpenModal} 
                        removeArticle={removeArticle} 
                        openEditModal={handleOpenEditArticleModal}
                    />
                ))}
            </div>

            {showAddArticleModal && (
                <AddArticleModal
                    closeModal={handleCloseModal}
                    handleAddArticle={handleAddArticle}
                    handleEditArticle={handleEditArticle}
                    articleToEdit={selectedArticle}
                />
            )}

            {selectedArticle && !showAddArticleModal && (
                <ArticleModal article={selectedArticle} closeModal={handleCloseModal} />
            )}
        </div>
    );
};

export default Home;
