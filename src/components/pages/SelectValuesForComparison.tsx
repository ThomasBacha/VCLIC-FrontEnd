// src/pages/SelectValueSetsForComparison.tsx
import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {fetchValueSets} from '../../services/ApiService.ts';
import {ValueSet} from '../../interface/ValueSet.interface.ts';

const SelectValueSetsForComparison: React.FC = () => {
    const [valueSets, setValueSets] = useState<ValueSet[]>([]);
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
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

    const handleCheckboxChange = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((value) => value !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedIds.length > 0) {
            navigate(`/compare?valueSetIds=${selectedIds.join(',')}`);
        } else {
            alert('Please select at least one value set.');
        }
    };

    return (
        <div>
            <h2>Select Value Sets for Comparison</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    {valueSets.map((vs) => (
                        <div key={vs.valueSetId}>
                            <input
                                type="checkbox"
                                id={vs.valueSetId}
                                value={vs.valueSetId}
                                onChange={() => handleCheckboxChange(vs.valueSetId)}
                            />
                            <label htmlFor={vs.valueSetId}>{vs.valueSetName}</label>
                        </div>
                    ))}
                </div>
                <button type="submit">Compare</button>
            </form>
        </div>
    );
};

export default SelectValueSetsForComparison;
