
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ArticleModal = ({ match }) => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const fetchArticleContent = async () => {
            try {
                const response = await axios.post('https://uptime-mercury-api.azurewebsites.net/webparser', {
                    url: match.params.id
                });
                setContent(response.data);
            } catch (error) {
                console.error("Error fetching article content", error);
            }
        };
        fetchArticleContent();
    }, [match.params.id]);

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close">&times;</span>
                <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
        </div>
    );
};

export default ArticleModal;
