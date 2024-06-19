// src/components/FeedManager.js
import React, { useContext, useState } from 'react';
import { FeedContext } from '../context/FeedContext';

const FeedManager = () => {
    const { addFeed, removeFeed, editFeed, feeds } = useContext(FeedContext);
    const [newFeedUrl, setNewFeedUrl] = useState('');
    const [editFeedUrl, setEditFeedUrl] = useState({ oldUrl: '', newUrl: '' });

    const handleAddFeed = () => {
        addFeed(newFeedUrl);
        setNewFeedUrl('');
    };

    const handleRemoveFeed = (url) => {
        removeFeed(url);
    };

    const handleEditFeed = () => {
        editFeed(editFeedUrl.oldUrl, editFeedUrl.newUrl);
        setEditFeedUrl({ oldUrl: '', newUrl: '' });
    };

    return (
        <div>
            <h2>Manage RSS Feeds</h2>
            <input
                type="text"
                value={newFeedUrl}
                onChange={(e) => setNewFeedUrl(e.target.value)}
                placeholder="Add RSS feed URL"
            />
            <button onClick={handleAddFeed}>Add Feed</button>

            <h3>Existing Feeds</h3>
            <ul>
                {feeds.map(feed => (
                    <li key={feed.feedUrl}>
                        {feed.title} ({feed.feedUrl})
                        <button onClick={() => handleRemoveFeed(feed.feedUrl)}>Remove</button>
                    </li>
                ))}
            </ul>

            <h3>Edit Feed</h3>
            <input
                type="text"
                value={editFeedUrl.oldUrl}
                onChange={(e) => setEditFeedUrl({ ...editFeedUrl, oldUrl: e.target.value })}
                placeholder="Old RSS feed URL"
            />
            <input
                type="text"
                value={editFeedUrl.newUrl}
                onChange={(e) => setEditFeedUrl({ ...editFeedUrl, newUrl: e.target.value })}
                placeholder="New RSS feed URL"
            />
            <button onClick={handleEditFeed}>Edit Feed</button>
        </div>
    );
};

export default FeedManager;
