// src/context/FeedContext.js
import React, { createContext, useState, useEffect } from 'react';
import { fetchRSSFeed } from '../services/rssService';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [feeds, setFeeds] = useState([]);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        // Load initial feed
        const loadInitialFeed = async () => {
            try {
                const initialFeed = await fetchRSSFeed('https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss');
                setFeeds([initialFeed]);
                setArticles(initialFeed.items.map(item => ({ ...item, id: item.guid || item.pubDate.slice(-2) })));
            } catch (error) {
                console.error("Error loading initial feed", error);
            }
        };
        loadInitialFeed();
    }, []);

    const addFeed = async (url) => {
        try {
            const newFeed = await fetchRSSFeed(url);
            setFeeds([...feeds, newFeed]);
            setArticles([...articles, ...newFeed.items.map(item => ({ ...item, id: item.guid || item.pubDate }))]);
        } catch (error) {
            console.error("Error adding new feed", error);
        }
    };

    const removeFeed = (url) => {
        const updatedFeeds = feeds.filter(feed => feed.feedUrl !== url);
        setFeeds(updatedFeeds);
        const updatedArticles = articles.filter(article => article.feedUrl !== url);
        setArticles(updatedArticles);
    };

    const removeArticle = (id) => {
        const updatedArticles = articles.filter(article => article.id !== id);
        setArticles(updatedArticles);
    };

    return (
        <FeedContext.Provider value={{ feeds, articles, addFeed, removeFeed, removeArticle }}>
            {children}
        </FeedContext.Provider>
    );
};
