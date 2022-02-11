import React from 'react';
import './AboutPage.css';
import mongodb from '../img/mongodb.png';
import express from '../img/express.png';
import react from '../img/react.png';
import nodejs from '../img/nodejs.png';
import js from '../img/js.png';
import jsx from '../img/jsx.png';
import aws from '../img/aws.jpg';
import css from '../img/css.png';

const AboutPage = () => {
    return (
        <>
            <h1>A Blog App built using the MERN Stack</h1>
            <table>
                <thead>
                    <tr>
                        <th>Technologies used</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><b>M</b>ongoDB</td>
                    </tr>
                    <tr>
                        <td><b>E</b>xpress</td>
                    </tr>
                    <tr>
                        <td><b>R</b>eact</td>
                    </tr>
                    <tr>
                        <td><b>N</b>ode.js</td>
                    </tr>
                    <tr>
                        <td>Javascript (ES2015)</td>
                    </tr>
                    <tr>
                        <td>AWS</td>
                    </tr>
                    <tr>
                        <td>JSX</td>
                    </tr>
                    <tr>
                        <td>CSS</td>
                    </tr>
                </tbody>
            </table>
            <div className="tech-images-container">
                <img src={mongodb} alt="MongoDB Logo" className="tech-images"/>
                <img src={express} alt="Express Logo" className="tech-images"/>
                <img src={react} alt="React Logo" className="tech-images"/>
                <img src={nodejs} alt="Node.js Logo" className="tech-images"/>
                <img src={js} alt="Javasript Logo" className="tech-images"/>
                <img src={jsx} alt="JSX Logo" className="tech-images"/>
                <img src={aws} alt="AWS Logo" className="tech-images"/>
                <img src={css} alt="CSS Logo" className="tech-images"/>
            </div>
        </>
    );
};

export default AboutPage;