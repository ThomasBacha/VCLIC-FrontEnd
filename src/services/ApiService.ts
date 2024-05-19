import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:7252/', // Replace with your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Handle request errors
api.interceptors.response.use(response => response, error => {
    // Log or handle errors here
    console.error('API request error: ', error);
    return Promise.reject(error);
});

// Upload Beta Blocker Value Sets
export const uploadBetaBlockerValues = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('BetaBlocker/upload-beta-blocker-values', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// Upload Medications
export const uploadMedications = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('Medication/upload-medications', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

// Fetch all Value Sets
export const fetchValueSets = () => {
    return api.get('ValueSets');
}

// Add a new Value Set
export const addValueSet = (valueSet: ValueSetDto) => {
    return api.post('ValueSets', valueSet);
}

// Delete all Value Sets
export const deleteAllValueSets = () => {
    return api.delete('ValueSets/delete-all-value-sets');
}

// Fetch details of a specific Value Set
export const getValueSetDetails = (id: string) => {
    return api.get(`ValueSets/${id}`);
}

// Delete a specific Value Set
export const deleteValueSet = (id: string) => {
    return api.delete(`ValueSets/${id}`);
}

// Compare Value Sets
export const compareValueSets = (valueSetIds: string[]) => {
    return api.get('ValueSets/compare', {
        params: {valueSetIds: valueSetIds.join(',')}
    });
}

export const getFullJoin = () => {
    return api.get('ValueSets/full-join');


}

// Define the ValueSetDto type
export interface ValueSetDto {
    valueSetId?: string;
    valueSetName?: string;
    medications?: number[];
}


