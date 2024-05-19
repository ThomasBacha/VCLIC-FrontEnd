// src/App.tsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UploadFiles from './components/UploadFiles';
import ListValueSets from './components/ListValueSets';
import ViewValueSet from './components/ViewValueSet';
import CompareValueSets from './components/CompareValueSets';
// import SelectValueSetsForComparison from "./components/SelectValueSetsForComparison";
import NavBar from './components/NavBar';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<UploadFiles/>}/>
                    <Route path="/valueSets" element={<ListValueSets/>}/>
                    <Route path="/valueSets/:id" element={<ViewValueSet/>}/>
                    <Route path="/compare" element={<CompareValueSets/>}/>
                    {/*<Route path="/select-value-sets" element={<SelectValueSetsForComparison/>}/>*/}

                </Routes>
            </div>

        </Router>
    );
};

export default App;
