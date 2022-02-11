import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
    return (
        <nav className="navbar">
            <h1 className="title">MERN Stack Blog App</h1>
            <ul>
                <li>
                    <NavLink to="/" activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/about" activeClassName="active">About</NavLink>
                </li>
                <li>
                    <NavLink to="/articles-list" activeClassName="active">Articles</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;