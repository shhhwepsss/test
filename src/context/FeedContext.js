import React, { createContext, useState, useEffect } from 'react';
import { fetchRSSFeed } from '../services/rssService';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const loadInitialFeed = async () => {
            try {
                const initialFeed = await fetchRSSFeed('https://flipboard.com/@raimoseero/feed-nii8kd0sz.rss');
                setArticles(initialFeed.items.map(item => ({ ...item, id: item.guid || item.pubDate.slice(-2) })));
            } catch (error) {
                console.error("Error loading initial feed", error);
            }
        };
        loadInitialFeed();
    }, []);

    const addArticle = (newArticle) => {
        setArticles([...articles, newArticle]);
    };

    return (
        <FeedContext.Provider value={{  articles, addArticle ,  }}>
            {children}
        </FeedContext.Provider>
    );
};
