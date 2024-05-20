// src/pages/FullJoinTable.tsx
import React, {useEffect, useState} from 'react';
import {getFullJoin} from '../../services/ApiService';
import '../css/FullJoinTable.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

interface Medication {
    medicationId: number;
    medName: string;
    simpleGenericName: string;
    route: string;
    outpatients: number;
    inpatients: number;
    patients: number;
}

interface JoinedData {
    valueSetId: string;
    valueSetName: string;
    medicationId: string;
    medication: Medication | null;
}

const FullJoinTable: React.FC = () => {
    const [data, setData] = useState<JoinedData[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [filteredData, setFilteredData] = useState<JoinedData[]>([]);
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getFullJoin();
                setData(response.data);
                setFilteredData(response.data); // Initialize filteredData with the full data set
            } catch (error) {
                console.error('Failed to fetch full join data', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const lowerCaseQuery = searchQuery.toLowerCase();
        const filtered = data.filter(row =>
            row.valueSetId.toLowerCase().includes(lowerCaseQuery) ||
            row.valueSetName.toLowerCase().includes(lowerCaseQuery) ||
            row.medicationId.toLowerCase().includes(lowerCaseQuery) ||
            row.medication?.medName.toLowerCase().includes(lowerCaseQuery) ||
            row.medication?.simpleGenericName.toLowerCase().includes(lowerCaseQuery) ||
            row.medication?.route.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredData(filtered);
    }, [searchQuery, data]);

    const toggleRowExpansion = (index: number) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(index)) {
            newExpandedRows.delete(index);
        } else {
            newExpandedRows.add(index);
        }
        setExpandedRows(newExpandedRows);
    };

    const expandAllRows = () => {
        const allRowIndexes = filteredData.map((_, index) => index);
        setExpandedRows(new Set(allRowIndexes));
    };

    const collapseAllRows = () => {
        setExpandedRows(new Set());
    };

    return (
        <div className="table-container">
            <h2>Full Join of Value Sets and Medications</h2>
            <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <table>
                <thead>
                <tr>
                    <th>
                        <i className="fa-solid fa-up-right-and-down-left-from-center" onClick={expandAllRows}
                           title="Expand All"></i>
                        <i className="fa-solid fa-minimize" onClick={collapseAllRows}
                           title="Collapse All"></i>
                    </th>
                    <th>Value Set ID</th>
                    <th>Value Set Name</th>
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
                {filteredData.map((row, index) => (
                    <React.Fragment key={index}>
                        <tr onClick={() => toggleRowExpansion(index)} style={{cursor: 'pointer'}}>
                            <td className={`caret ${expandedRows.has(index) ? 'expanded' : ''}`}></td>
                            <td>{row.valueSetId}</td>
                            <td>{row.valueSetName}</td>
                            <td>{row.medicationId}</td>
                            <td>{row.medication?.medName || '0'}</td>
                            <td>{row.medication?.simpleGenericName || '0'}</td>
                            <td>{row.medication?.route || '0'}</td>
                            <td>{row.medication?.outpatients || '0'}</td>
                            <td>{row.medication?.inpatients || '0'}</td>
                            <td>{row.medication?.patients || '0'}</td>
                        </tr>
                        {expandedRows.has(index) && (
                            <tr className="expanded-row">
                                <td colSpan={10} className="expanded-content">
                                    <div>
                                        <strong>Value Set ID:</strong> {row.valueSetId}
                                    </div>
                                    <div>
                                        <strong>Value Set Name:</strong> {row.valueSetName}
                                    </div>
                                    <div>
                                        <strong>Medication ID:</strong> {row.medicationId}
                                    </div>
                                    <div>
                                        <strong>Medication Name:</strong> {row.medication?.medName || '0'}
                                    </div>
                                    <div>
                                        <strong>Simple Generic
                                            Name:</strong> {row.medication?.simpleGenericName || '0'}
                                    </div>
                                    <div>
                                        <strong>Route:</strong> {row.medication?.route || '0'}
                                    </div>
                                    <div>
                                        <strong>Outpatients:</strong> {row.medication?.outpatients || '0'}
                                    </div>
                                    <div>
                                        <strong>Inpatients:</strong> {row.medication?.inpatients || '0'}
                                    </div>
                                    <div>
                                        <strong>Patients:</strong> {row.medication?.patients || '0'}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </React.Fragment>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default FullJoinTable;
