import React from 'react';
import { Link } from 'react-router-dom';
import './ArticleList.css';

const ArticlesList = (props) => {
    const { articles } = props;
    return (
        <>
            {articles && articles.map((article, key) => (
                <div key={key} className="card">
                    <div className="container">
                        <h3>{article.name}</h3>
                        <p><b>Category: </b>{article.category}</p>
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
    );
}

export default ArticlesList;