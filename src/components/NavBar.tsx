// src/components/NavBar.tsx
import React from 'react';
import {Link} from 'react-router-dom';
import './css/NavBar.css';

const NavBar: React.FC = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Upload Files</Link>
                </li>
                <li>
                    <Link to="/valueSets">List Value Sets</Link>
                </li>
                <li>
                    <Link to="/select-value-sets">Compare Value Sets</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
