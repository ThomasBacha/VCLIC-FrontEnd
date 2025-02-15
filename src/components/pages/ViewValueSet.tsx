// src/pages/ViewValueSet.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getValueSetDetails } from '../../services/ApiService.ts';
import { ValueSetDetails } from '../../interface/ValueSetDetails.interface.ts';

const ViewValueSet: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [valueSetDetails, setValueSetDetails] = useState<ValueSetDetails | null>(null);

  useEffect(() => {
    const fetchValueSetDetails = async () => {
      try {
        const response = await getValueSetDetails(id!);
        setValueSetDetails(response.data);
      } catch (error) {
        console.error('Failed to fetch value set details', error);
      }
    };

    fetchValueSetDetails();
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
            <p>Outpatients: {med.outpatients}</p>
            <p>Inpatients: {med.inpatients}</p>
            <p>Total Patients: {med.patients}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewValueSet;
