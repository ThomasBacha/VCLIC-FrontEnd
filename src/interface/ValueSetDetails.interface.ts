import {Medication} from "./Medication.interface.ts";

export interface ValueSetDetails {
  valueSetId: string;
  valueSetName: string;
  medications: Medication[];
}