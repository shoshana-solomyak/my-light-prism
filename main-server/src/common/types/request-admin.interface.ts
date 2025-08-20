import type { RequestUserType } from "@hilma/auth-mongo-nest";

/**
 * So hilma/auth adds the phoneNumber of the user to the two-factor jwt cookie.
 * After login, we DO NOT add the phoneNumber to the "requestUser" (see user/therapist/patient.service.ts#confirmCode funcs)
 */
export interface RequestAdminType extends RequestUserType {
    phoneNumber?: string;
    healthcareCenterId: string;
}
