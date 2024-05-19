import { Medication } from './Medication.interface';
export interface ComparisonResult {
    commonMedications: Medication[];
    uniqueMedications: Record<string, Medication[]>;
}