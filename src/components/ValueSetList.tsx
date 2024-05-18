import React, {useState, useEffect} from 'react';
import {fetchValueSets} from "../apiService.ts";

interface Props {
    searchQuery: string;
}

interface ValueSet {
    id: number;
    name: string;
    medications: string;
}

const ValueSetList: React.FC<Props> = ({searchQuery}) => {
    const [sets, setSets] = useState<ValueSet[]>([]);
    const [filteredSets, setFilteredSets] = useState<ValueSet[]>([]);

    useEffect(() => {
        fetchValueSets()
            .then(response => {
                setSets(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch value sets:', error);
                setSets([]);
            });
    }, []);
    // Filter sets when searchQuery changes
    useEffect(() => {
        const filtered = sets.filter(set =>
            set.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredSets(filtered);
    }, [searchQuery, sets]);

    return (
        <div>
            <h2>Value Sets</h2>
            {filteredSets.map((set, index) => (
                <div key={`${set.id}-${index}`}>
                    {set.name}
                </div>
            ))}

        </div>
    );
};

export default ValueSetList;
