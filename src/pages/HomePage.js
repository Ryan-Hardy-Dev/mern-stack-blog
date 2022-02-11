import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    const [recentArticles, setRecentArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const request = await fetch(`/api/articles/recent/articles`);
            const response = await request.json();
            setRecentArticles(response);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    if (!isLoading) {
        return (
            <>
                <h1>Welcome...</h1>
                <h3>View the most recent articles below...</h3>
                {recentArticles && recentArticles.map((article, key) => (
                    <div key={key} className="card">
                        <div className="container">
                            <h3>{article.name}</h3>
                            <p><b>Category: </b>{article.category}</p>
                            <p>{article.content[0].substring(0, 150)}...</p>
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
        );
    } else {
        return <h1>Loading</h1>
    }
};

export default HomePage;