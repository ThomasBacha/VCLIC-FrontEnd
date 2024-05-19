// src/pages/ViewValueSet.tsx
import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getValueSetDetails} from '../apiService.ts';

interface Medication {
    medicationId: number;
    medName: string;
    simpleGenericName: string;
    route: string;
    outpatients: number;
    inpatients: number;
    patients: number;
}

interface ValueSetDetails {
    valueSetId: string;
    valueSetName: string;
    medications: Medication[];
}

const ViewValueSet: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [valueSetDetails, setValueSetDetails] = useState<ValueSetDetails | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getValueSetDetails(id!);
                setValueSetDetails(response.data);
            } catch (error) {
                console.error('Failed to fetch value set details', error);
            }
        };

        fetchData();
    }, [id]);

    if (!valueSetDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{valueSetDetails.valueSetName}</h2>
            <h3>Medications</h3>
            <ul>
                {valueSetDetails.medications.map((med) => (
                    <li key={med.medicationId}>
                        {med.medName} ({med.simpleGenericName}) - {med.route}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewValueSet;
