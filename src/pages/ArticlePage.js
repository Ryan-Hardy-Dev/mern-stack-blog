import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SuggestionsList from '../components/SuggestionsList';
import Modal from 'react-modal';
import './ArticlePage.css';

const ArticlePage = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isArticleLoading, setArticleLoading] = useState(true);
    const [article, setArticle] = useState();
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [commentText, setCommentText] = useState('');
    const [comments, setComments] = useState([]);

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          width: '70%',
          height: '90%',
          borderColor: 'black',
          borderWidth: '0.3rem'
        }
    };

    useEffect(() => {
        // fetch specific Article
        const fetchArticle = async () => {
            const request = await fetch(`/api/articles/${params.name}`);
            const response = await request.json();
            setArticle(response);
            setArticleLoading(false);
        };

        fetchArticle();
    }, [params.name]);

    useEffect(() => {
        const fetchData = async () => {
            const request = await fetch(`/api/articles/${params.name}`)
            const response = await request.json();
            setArticleInfo(response);
        };
        fetchData();
    }, [params.name]);

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleUpvote = async (name) => {
        const request = await fetch(`/api/articles/${name}/upvote`, { method: 'POST' });
        const response = await request.json();
        setArticleInfo(response);
    };

    const openComments = async (name) => {
        const request = await fetch(`/api/articles/${name}/comments`);
        const response = await request.json();
        setComments(response);
        setIsModalOpen(true);
    }

    const addComment = async (name) => {
        const request = await fetch(`/api/articles/${name}/add-comment`, { 
            method: 'POST',
            body: JSON.stringify({ username, text: commentText }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const response = await request.json();
        setComments(response);
        setUsername('');
        setCommentText('');
    }

    const deleteArticle = async (article) => {
        const name = article.name;
        await fetch(`/api/articles/${name}`, { 
            method: 'DELETE',
        });
        navigate('/articles-list');
    }

    const isSaveCommentDisabled = () => {
        if (!commentText || !username) {
            return true;
        } else {
            return false;
        }
    }

    if (!isArticleLoading) {
        return (
            <>
                <div className="main-card">
                    <h1>{article.name}</h1>
                    <p><b>Category: </b>{article.category}</p>
                    {article.content.map((paragraph, key) => (
                        <p key={key}>{paragraph}</p>
                    ))}
                    <p><b>Date Posted: </b>{new Date(article.timestamp).toLocaleDateString("en-UK")}</p>
                    <div>
                        <button 
                            className="upvote-btn"
                            onClick={() => handleUpvote(article.name)}
                        >
                            Like Article
                        </button>
                        <button 
                            className="view-comments-btn"
                            onClick={() => openComments(article.name)}
                        >
                            View Comments
                        </button>
                        <button 
                            className="delete-article-btn"
                            onClick={() => deleteArticle(article)}
                        >
                            Delete Article
                        </button>
                        <p>This Article has <b>{articleInfo.upvotes} Likes</b>.</p>
                    </div>
                </div>
                <hr />
                <h3>Suggested Articles:</h3>
                <div>
                    <SuggestionsList articleName={params.name} />
                </div>
                {
                    isModalOpen && 
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        ariaHideApp={false}
                    >
                        <div>
                            <h1>Comments</h1>
                            <hr/>
                            {comments.length !== 0 ?
                                comments.map((comment, key) => {
                                    return (
                                        <>
                                            <div key={key} className="card">
                                                <p><b>Username:</b> {comment.username}</p>
                                                <p><b>Comment:</b> {comment.text}</p>
                                            </div>
                                        </>
                                    );
                                }) : <h3>No comments on this Article</h3>
                            }
                            <hr/>
                            <div className="form-container">
                                <form>
                                    <h3>Add a comment</h3>
                                    <div className="form-row">
                                        <label>
                                            <b>Username:</b> 
                                            <input 
                                                type="text" 
                                                name="username" 
                                                className="username-input" 
                                                value={username} 
                                                onChange={(event) => setUsername(event.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-row">
                                        <label>
                                            <b>Comment:</b>
                                            <input 
                                                type="text" 
                                                name="comment" 
                                                className="comment-input" 
                                                value={commentText}
                                                onChange={(event) => setCommentText(event.target.value)}
                                            />
                                        </label>
                                    </div>
                                    <div className="form-row">
                                        <button 
                                            className="add-comment-btn"
                                            onClick={() => addComment(article.name)}
                                            disabled={isSaveCommentDisabled()}
                                        >
                                            Submit Comment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                }
            </>
        );
    } else {
        return <h1>Loading...</h1>
    }
};

export default ArticlePage;