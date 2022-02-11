import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ArticlesList from '../components/ArticlesList';
import Modal from 'react-modal';
import './ArticlesListPage.css';

const ArticlesListPage = () => {
    const navigate = useNavigate();
    const [articleName, setArticleName] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [filterCategory, setFilterCategory] = useState(undefined);
    const [articleContent, setArticleContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        // retrieve all articles
        const fetchData = async () => {
            const request = await fetch(`/api/articles`);
            const response = await request.json();
            setArticleContent(response);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const createArticle = async () => {
        await fetch(`/api/articles`, {
            method: 'POST',
            body: JSON.stringify({ 
                articleName, 
                text: content, 
                category: category 
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        setArticleName('');
        setContent('');
        navigate('/articles-list');
    };

    const filterArticles = async () => {
        const request = await fetch(`/api/articles/filter-categories`, {
            method: 'POST',
            body: JSON.stringify({
                articleCategory: filterCategory
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const response = await request.json();
        setArticleContent(response);
    };

    const isSaveBtnDisabled = () => {
        if(!content || !articleName){
            return true;
        } else {
            return false;
        }
    }

    if(!isLoading) {
        return (
            <>
                <button 
                    className="create-article-btn"
                    onClick={() => openModal()}
                >
                    Create Article
                </button>
                <br/>
                <b>Filter Articles: </b>
                <select
                    value={filterCategory}
                    onChange={(event) => setFilterCategory(event.target.value)}
                >
                    <option value="">None</option>
                    <option value="Sport">Sport</option>
                    <option value="Technology">Technology</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Politics">Politics</option>
                    <option value="Health">Health</option>
                </select>
                <button 
                    onClick={() => filterArticles()}
                    className="filter-btn"
                >
                    Apply Filter
                </button>
                <br/><br/>
                {isModalOpen && 
                    <Modal
                        isOpen={isModalOpen}
                        onRequestClose={closeModal}
                        style={customStyles}
                        ariaHideApp={false}
                    >
                        <h1 className="heading">Create an Article</h1>
                        <hr />
                        <div className="form-container">
                            <form>
                                <div className="form-row">
                                    <label>
                                        <b className="input-title">Article Name:</b>
                                        <br/>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            className="article-name-input" 
                                            value={articleName} 
                                            onChange={(event) => setArticleName(event.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="form-row">
                                    <label>
                                        <b className="input-title">Content:</b>
                                        <br />
                                        <input 
                                            type="text" 
                                            name="content" 
                                            className="content-input" 
                                            value={content} 
                                            onChange={(event) => setContent(event.target.value)}
                                        />
                                    </label>
                                </div>
                                <div className="form-row">
                                    <label>
                                        <b className="input-title">Category:</b>
                                        <br/>
                                        <select
                                            value={category}
                                            onChange={(event) => setCategory(event.target.value)}
                                        >
                                            <option value="">None</option>
                                            <option value="Sport">Sport</option>
                                            <option value="Technology">Technology</option>
                                            <option value="Fashion">Fashion</option>
                                            <option value="Politics">Politics</option>
                                            <option value="Health">Health</option>
                                        </select>
                                    </label>
                                </div>
                                <div className="form-row">
                                    <button
                                        className="save-article-btn"
                                        onClick={() => createArticle()}
                                        disabled={isSaveBtnDisabled()}
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Modal>
                }
                <ArticlesList articles={articleContent} />
            </>
        );
    } else {
        return <h1>Loading...</h1>
    }
};

export default ArticlesListPage;