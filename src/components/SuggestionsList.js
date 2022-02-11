import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ArticleList.css';

const SuggestionsList = ({ articleName }) => {
    const [articleSuggestions, setArticleSuggestions] = useState([]);
    const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(true);

    useEffect(() => {
        const fetchArticleSuggestions = async () => {
            const request = await fetch(`/api/articles/suggestions`, { 
                method: 'POST',
                body: JSON.stringify({ articleName: articleName }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const response = await request.json();
            setArticleSuggestions(response);
            setIsSuggestionsLoading(false);
        };
        fetchArticleSuggestions();
    }, [articleName]);
    
    if (!isSuggestionsLoading) {
        return(
            <>
                {articleSuggestions && articleSuggestions.map((article, key) => (
                    <div key={key} className="card">
                        <div className="container">
                            <h3>{article.name}</h3>
                            <p><b>Category: </b> {article.category}</p>
                            <p>{article.content[0].substring(0, 35)}...</p>
                            <p><b>Date Posted:</b> {new Date(article.timestamp).toLocaleDateString("en-UK")}</p>
                            <Link to={`/article/${article.name}`}>
                                <button 
                                    className="upvote-btn"
                                >
                                    View Article
                                </button>
                            </Link>
                        </div>
                    </div>
                ))}
            </>
        )
    } else {
        return(
            <h1>Loading....</h1>
        )
    };
};

export default SuggestionsList;