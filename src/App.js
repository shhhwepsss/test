// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FeedProvider } from './context/FeedContext';
import Home from './components/Home';
import ArticleModal from './components/ArticleModal';
import './components/Home.css';

const App = () => {
    return (
        <FeedProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/article/:id" element={<ArticleModal />} />
                </Routes>
            </Router>
        </FeedProvider>
    );
};

export default App;
