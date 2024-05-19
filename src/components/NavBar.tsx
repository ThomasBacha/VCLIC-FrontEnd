// src/components/NavBar.tsx
import React from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import './css/NavBar.css';

const NavBar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const getButtonClass = (path: string) => {
        return location.pathname === path ? 'active' : '';
    };

    return (
        <nav>
            <div className="nav-buttons">
                <button
                    className={getButtonClass('/')}
                    onClick={() => navigate('/')}
                >
                    Home
                </button>
                <button
                    className={getButtonClass('/UploadFiles')}
                    onClick={() => navigate('/UploadFiles')}
                >
                    Upload Files
                </button>
                <button
                    className={getButtonClass('/valueSets')}
                    onClick={() => navigate('/valueSets')}
                >
                    List Value Sets
                </button>
                <button
                    className={getButtonClass('/compare')}
                    onClick={() => navigate('/compare')}
                >
                    Compare Value Sets
                </button>
                <button
                    className={getButtonClass('/full-join')}
                    onClick={() => navigate('/full-join')}
                >
                    Query Joined Table
                </button>
            </div>
        </nav>
    );
};

export default NavBar;
