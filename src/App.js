import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlesListPage from './pages/ArticlesListPage';
import ArticlePage from './pages/ArticlePage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar />
        <div id="page-body">
          <Routes>
              <Route path="/" exact element={<HomePage/>}/>
              <Route path="/about" element={<AboutPage/>}/>
              <Route path="/articles-list" element={<ArticlesListPage/>}/>
              <Route path="/article/:name" element={<ArticlePage/>}/>
              <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
