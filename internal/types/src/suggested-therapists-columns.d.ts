import type { CompatibilityReasons } from "./compatibility-reasons";

export interface SuggestedTherapistsColumns {
    id: string;
    therapistName: string;
    compatibilityPercentage: string;
    compatibilityReasons: CompatibilityReasons;
}
