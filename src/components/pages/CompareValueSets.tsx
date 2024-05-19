// src/pages/CompareValueSets.tsx
import React, { useEffect, useState } from 'react';
import { compareValueSets, fetchValueSets } from '../../services/ApiService';
import '../css/CompareValueSets.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS
import { ComparisonResult } from '../../interface/ComparisonResult.interface';
import { ValueSet } from '../../interface/ValueSet.interface';


const CompareValueSets: React.FC = () => {
    const [valueSets, setValueSets] = useState<ValueSet[]>([]);
    const [selectedValueSetIds, setSelectedValueSetIds] = useState<string[]>([]);
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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

    const handleValueSetChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const valueSetId = event.target.value;
        setSelectedValueSetIds((prevSelected) => {
            if (prevSelected.includes(valueSetId)) {
                return prevSelected.filter((id) => id !== valueSetId);
            } else {
                return [...prevSelected, valueSetId];
            }
        });
    };

    const handleCompare = async () => {
        if (selectedValueSetIds.length > 0) {
            try {
                const response = await compareValueSets(selectedValueSetIds);
                setComparisonResult(response.data);
            } catch (error) {
                console.error('Failed to compare value sets:', error);
            }
        }
    };

    const handleClear = () => {
        setSelectedValueSetIds([]);
        setComparisonResult(null);
        setExpandedRows(new Set());
    };

    const toggleRowExpansion = (valueSetId: string) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(valueSetId)) {
            newExpandedRows.delete(valueSetId);
        } else {
            newExpandedRows.add(valueSetId);
        }
        setExpandedRows(newExpandedRows);
    };

    const expandAllRows = () => {
        const allValueSetIds = Object.keys(comparisonResult?.uniqueMedications || {});
        setExpandedRows(new Set(allValueSetIds));
    };

    const collapseAllRows = () => {
        setExpandedRows(new Set());
    };

    return (
        <div className="comparison-container">
            <h2>Select Value Sets for Comparison</h2>
            <div className="value-set-list">
                {valueSets.map((vs) => (
                    <div key={vs.valueSetId}>
                        <input
                            type="checkbox"
                            id={vs.valueSetId}
                            value={vs.valueSetId}
                            checked={selectedValueSetIds.includes(vs.valueSetId)}
                            onChange={handleValueSetChange}
                        />
                        <label htmlFor={vs.valueSetId}>{vs.valueSetName}</label>
                    </div>
                ))}
            </div>
            <div className="control-buttons">
                <button onClick={handleCompare}>Compare Selected Value Sets</button>
                <button onClick={handleClear}>Clear</button>
            </div>

            {comparisonResult && (
                <>
                    <h2>Comparison Results</h2>
                    <h3>Common Medications</h3>
                    <div style={{ overflowX: 'auto' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Medication ID</th>
                                    <th>Medication Name</th>
                                    <th>Simple Generic Name</th>
                                    <th>Route</th>
                                    <th>Outpatients</th>
                                    <th>Inpatients</th>
                                    <th>Patients</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonResult.commonMedications.map((med) => (
                                    <tr key={med.medicationId}>
                                        <td>{med.medicationId}</td>
                                        <td>{med.medName}</td>
                                        <td>{med.simpleGenericName}</td>
                                        <td>{med.route}</td>
                                        <td>{med.outpatients}</td>
                                        <td>{med.inpatients}</td>
                                        <td>{med.patients}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <h3>Unique Medications</h3>
                    <div className="control-buttons">
                        <i className="fas fa-chevron-down" onClick={expandAllRows} title="Expand All"></i>
                        <i className="fas fa-chevron-up" onClick={collapseAllRows} title="Collapse All"></i>
                    </div>
                    {Object.entries(comparisonResult.uniqueMedications).map(([valueSetId, medications]) => (
                        <div key={valueSetId}>
                            <h4 onClick={() => toggleRowExpansion(valueSetId)} style={{ cursor: 'pointer' }}>
                                <i className={`fas ${expandedRows.has(valueSetId) ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i> Unique Medications for Value Set {valueSetId}
                            </h4>
                            {expandedRows.has(valueSetId) && (
                                <div style={{ overflowX: 'auto' }}>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Medication ID</th>
                                                <th>Medication Name</th>
                                                <th>Simple Generic Name</th>
                                                <th>Route</th>
                                                <th>Outpatients</th>
                                                <th>Inpatients</th>
                                                <th>Patients</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {medications.map((med) => (
                                                <tr key={med.medicationId}>
                                                    <td>{med.medicationId}</td>
                                                    <td>{med.medName}</td>
                                                    <td>{med.simpleGenericName}</td>
                                                    <td>{med.route}</td>
                                                    <td>{med.outpatients}</td>
                                                    <td>{med.inpatients}</td>
                                                    <td>{med.patients}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default CompareValueSets;
