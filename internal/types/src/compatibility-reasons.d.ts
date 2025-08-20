export type CompatibilityScore = "1" | "-1" | "0";

export interface CompatibilityReasons {
    gender: CompatibilityScore;
    language: CompatibilityScore;
    religiousSector: CompatibilityScore;
    treatmentLocation: CompatibilityScore;
    vocationalTraining: CompatibilityScore;
}
