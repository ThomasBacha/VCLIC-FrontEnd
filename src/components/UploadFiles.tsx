// src/pages/UploadFiles.tsx
import React, {useState} from 'react';
import {uploadBetaBlockerValues, uploadMedications} from '../apiService.ts'

const UploadFiles: React.FC = () => {
    const [betaBlockerFile, setBetaBlockerFile] = useState<File | null>(null);
    const [medicationsFile, setMedicationsFile] = useState<File | null>(null);

    const handleBetaBlockerUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (betaBlockerFile) {
            try {
                await uploadBetaBlockerValues(betaBlockerFile);
                alert('Beta Blocker Value Sets uploaded successfully');
            } catch (error) {
                alert('Failed to upload Beta Blocker Value Sets');
            }
        } else {
            alert('Please select a Beta Blocker Value Sets file');
        }
    };

    const handleMedicationsUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (medicationsFile) {
            try {
                await uploadMedications(medicationsFile);
                alert('Medications uploaded successfully');
            } catch (error) {
                alert('Failed to upload Medications');
            }
        } else {
            alert('Please select a Medications file');
        }
    };

    return (
        <div>
            <h2>Upload CSV Files</h2>
            <form onSubmit={handleBetaBlockerUpload}>
                <div>
                    <label>Beta Blocker Value Sets File:</label>
                    <input type="file" onChange={(e) => setBetaBlockerFile(e.target.files?.[0] || null)}/>
                </div>
                <button type="submit">Upload Beta Blocker Value Sets</button>
            </form>
            <form onSubmit={handleMedicationsUpload}>
                <div>
                    <label>Medications File:</label>
                    <input type="file" onChange={(e) => setMedicationsFile(e.target.files?.[0] || null)}/>
                </div>
                <button type="submit">Upload Medications</button>
            </form>
        </div>
    );
};

export default UploadFiles;
