import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchValueSets} from '../../services/ApiService';
import '../css/ListValueSets.css';
import {ValueSet} from '../../interface/ValueSet.interface.ts';

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
        <div className="container">
            <h2>Beta Blocker Value Sets</h2>
            <ul>
                {valueSets.map((vs) => (
                    <li key={vs.valueSetId} onClick={() => navigate(`/valueSets/${vs.valueSetId}`)}>
                        {vs.valueSetName}
                    </li>
                ))}
            </ul>
            <button onClick={() => navigate('/compare')}>
                Compare Value Sets
            </button>
        </div>
    );
};

export default ListValueSets;
