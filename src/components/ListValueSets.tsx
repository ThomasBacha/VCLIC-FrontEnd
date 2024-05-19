// src/pages/ListValueSets.tsx
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchValueSets} from '../apiService';

interface ValueSet {
    valueSetId: string;
    valueSetName: string;
    medications: number[];
}

const ListValueSets: React.FC = () => {
    const [valueSets, setValueSets] = useState<ValueSet[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchValueSets();
                setValueSets(response.data);
            } catch (error) {
                console.error('Failed to fetch value sets', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Beta Blocker Value Sets</h2>
            <ul>
                {valueSets.map((vs) => (
                    <li key={vs.valueSetId} onClick={() => navigate(`/valueSets/${vs.valueSetId}`)}>
                        {vs.valueSetName}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/select-value-sets')}>
                Compare Value Sets
            </button>
        </div>
    );
};

export default ListValueSets;
