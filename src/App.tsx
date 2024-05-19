// src/App.tsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UploadFiles from './components/pages/UploadFiles.tsx';
import ListValueSets from './components/pages/ListValueSets.tsx';
import ViewValueSet from './components/pages/ViewValueSet.tsx';
import CompareValueSets from './components/pages/CompareValueSets.tsx';
import NavBar from './components/NavBar';
import './App.css';
import './index.css';
import FullJoinTable from "./components/pages/FullJoinTable.tsx";
import HomePage from "./components/pages/HomePage.tsx";

const App: React.FC = () => {
    return (
        <Router>
            <NavBar/>
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/valueSets" element={<ListValueSets/>}/>
                    <Route path="/valueSets/:id" element={<ViewValueSet/>}/>
                    <Route path="/compare" element={<CompareValueSets/>}/>
                    <Route path="/full-join" element={<FullJoinTable/>}/>
                    <Route path="/UploadFiles" element={<UploadFiles/>}/>

                </Routes>
            </div>

        </Router>
    );
};

export default App;
