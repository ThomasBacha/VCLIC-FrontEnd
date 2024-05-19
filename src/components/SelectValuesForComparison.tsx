// src/pages/SelectValueSetsForComparison.tsx
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SelectValueSetsForComparison: React.FC = () => {
    const [valueSetIds, setValueSetIds] = useState<string>('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (valueSetIds) {
            navigate(`/compare?valueSetIds=${valueSetIds}`);
        } else {
            alert('Please enter at least one value set ID.');
        }
    };

    return (
        <div>
            <h2>Select Value Sets for Comparison</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Value Set IDs (comma-separated):</label>
                    <input
                        type="text"
                        value={valueSetIds}
                        onChange={(e) => setValueSetIds(e.target.value)}
                    />
                </div>
                <button type="submit">Compare</button>
            </form>
        </div>
    );
};

export default SelectValueSetsForComparison;
