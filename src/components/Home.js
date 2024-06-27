import React, { useContext, useState, useEffect } from 'react';
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
    const [error, setError] = useState('');
    const [existingArticles, setExistingArticles] = useState([]);

    const fetchExistingArticles = async () => {
        try {
            const response = await fetch('http://localhost:4000/articles');
            if (!response.ok) {
                throw new Error('Failed to fetch articles');
            }
            const data = await response.json();
            setExistingArticles(data);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };
    useEffect(() => {

        fetchExistingArticles();
    }, []);


    const handleAddArticle = async (newArticle) => {
        try {
            await addArticle(newArticle);
            setShowAddArticleModal(false);
            setError('');
        } catch (error) {
            console.error('Error adding article:', error.message);
            setError('Failed to add article. Please try again later.');
        }
    };

    const handleEditArticle = async (updatedArticle) => {
        try {
            await editArticle(updatedArticle);
            setShowAddArticleModal(false);
            setError('');
        } catch (error) {
            console.error('Error editing article:', error.message);
            setError('Failed to edit article. Please try again later.');
        }
    };

    const handleOpenModal = (article) => {
        setSelectedArticle(article);
    };

    const handleCloseModal = () => {
        setSelectedArticle(null);
        setShowAddArticleModal(false);
        setError('');
    };

    const handleOpenAddArticleModal = () => {
        setSelectedArticle(null);
        setShowAddArticleModal(true);
        setError('');
    };

    const handleOpenEditArticleModal = (article) => {
        setSelectedArticle(article);
        setShowAddArticleModal(true);
        setError('');
    };

    const filteredArticles = filter
        ? articles.filter(article =>
            article.categories.some(category => category.toLowerCase().includes(filter.toLowerCase()))
        ).sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
        : articles.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        const combinedArticles = [...existingArticles, ...filteredArticles];

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
                {combinedArticles.map(article => (
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
                    setError={setError}
                    fetchExistingArticles={fetchExistingArticles}
                    
                />
            )}

            {selectedArticle && !showAddArticleModal && (
                <ArticleModal article={selectedArticle} closeModal={handleCloseModal} />
            )}


            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    );
};

export default Home;
