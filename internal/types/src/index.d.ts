import type { SURVEY_ACTIONS, SURVEY_IDS } from "@internal/constants";

/**
 * ### Temporary type
 * ! Stricter type should be defined for this property
 *
 *
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Dedicated type for avoiding any
export type Todo = any;

export type SurveyId = (typeof SURVEY_IDS)[keyof typeof SURVEY_IDS];
export type SurveyAction = (typeof SURVEY_ACTIONS)[keyof typeof SURVEY_ACTIONS];

export type * from "./auth-token";
export type * from "./create-admin";
export type * from "./patients-columns";
export type * from "./therapists-columns";
export type * from "./suggested-therapists-columns";
export type * from "./admin-details";
