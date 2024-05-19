// src/pages/CompareValueSets.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { compareValueSets } from '../apiService';

interface Medication {
  medicationId: number;
  medName: string;
  simpleGenericName: string;
  route: string;
  outpatients: number;
  inpatients: number;
  patients: number;
}

interface ComparisonResult {
  commonMedications: Medication[];
  uniqueMedications: Record<string, Medication[]>;
}

const CompareValueSets: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const valueSetIds = params.get('valueSetIds')?.split(',') || [];

  const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await compareValueSets(valueSetIds);
        setComparisonResult(response.data);
      } catch (error) {
        console.error('Failed to compare value sets', error);
      }
    };

    if (valueSetIds.length > 0) {
      fetchData();
    }
  }, [valueSetIds]);

  if (!comparisonResult) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Comparison Results</h2>
      <h3>Common Medications</h3>
      <ul>
        {comparisonResult.commonMedications.map((med) => (
          <li key={med.medicationId}>
            {med.medName} ({med.simpleGenericName}) - {med.route}
          </li>
        ))}
      </ul>
      {Object.entries(comparisonResult.uniqueMedications).map(([valueSetId, medications]) => (
        <div key={valueSetId}>
          <h3>Unique Medications for Value Set {valueSetId}</h3>
          <ul>
            {medications.map((med) => (
              <li key={med.medicationId}>
                {med.medName} ({med.simpleGenericName}) - {med.route}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CompareValueSets;
