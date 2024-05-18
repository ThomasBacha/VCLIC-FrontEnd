import React, {useState, useEffect} from 'react';
import axios from "axios";

interface Props {
    searchQuery: string;
}

const ValueSetList: React.FC<Props> = ({searchQuery}) => {
    const [sets, setSets] = useState<any[]>([]);
    const [filteredSets, setFilteredSets] = useState<any[]>([]);

    // Fetch data from API on component mount and when searchQuery changes
    useEffect(() => {
        axios.get('https://10.0.0.193:7252/ValueSet')
            .then(response => {
                setSets(response.data);
                setFilteredSets(response.data);
                console.log('Value sets fetched:', response.data);
                console.log('Search query:', searchQuery);
            })
            .catch(error => console.error('Error fetching value sets', error));
    }, [searchQuery]);  // Dependency array includes searchQuery to refetch when it changes, if needed

    // Filter sets when searchQuery or sets change
    useEffect(() => {
        if (searchQuery) {
            const filtered = sets.filter(set =>
                set.value_set_name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredSets(filtered);
        } else {
            setFilteredSets(sets);
        }
    }, [searchQuery, sets]);

    return (
        <div>
            <h2>Value Sets</h2>
            {filteredSets.map((set: any) => (
                <div key={set.value_set_id}>
                    {set.value_set_name}
                </div>
            ))}
        </div>
    );
};

export default ValueSetList;
